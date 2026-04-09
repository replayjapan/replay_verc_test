'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useField } from '@payloadcms/ui'
import { countJapaneseCharacters } from '../utilities/japaneseCharacterCount'

interface CustomSeoTextFieldProps {
  path: string
  label?: string
  required?: boolean
  readOnly?: boolean
  placeholder?: string
  fieldType: 'title' | 'description'
  context?: 'meta' | 'og'
  isTextArea?: boolean
}

// Module-level cache for site settings (shared across all instances)
let cachedSettings: { data: Record<string, unknown>; fetchedAt: number } | null = null
const CACHE_TTL = 60_000 // 1 minute

async function fetchSiteSettingsCached(): Promise<Record<string, unknown> | null> {
  const now = Date.now()
  if (cachedSettings && now - cachedSettings.fetchedAt < CACHE_TTL) {
    return cachedSettings.data
  }

  try {
    const response = await fetch('/api/globals/site-settings')
    if (response.ok) {
      const data = await response.json()
      cachedSettings = { data, fetchedAt: now }
      return data
    }
  } catch {
    // Use cached data if available, even if stale
    if (cachedSettings) return cachedSettings.data
  }
  return null
}

const CustomSeoTextField: React.FC<CustomSeoTextFieldProps> = ({
  path,
  label,
  required,
  readOnly,
  placeholder,
  fieldType,
  context = 'meta',
  isTextArea = false,
}) => {
  const { value, setValue, showError, errorMessage } = useField<string>({ path })

  const [displayValue, setDisplayValue] = useState(value || '')
  const [currentCount, setCurrentCount] = useState(0)
  const [maxCount, setMaxCount] = useState(fieldType === 'title' ? 60 : 160)
  const fetchedRef = useRef(false)

  // Fetch site settings once (cached across all instances)
  useEffect(() => {
    if (fetchedRef.current) return
    fetchedRef.current = true

    const load = async () => {
      const settings = await fetchSiteSettingsCached()
      if (!settings) return

      let limit = fieldType === 'title' ? 60 : 160
      if (context === 'og') {
        if (fieldType === 'title') {
          limit = (settings.ogTitleLimit as number) || 60
        } else {
          limit = (settings.ogDescriptionLimit as number) || 160
        }
      } else {
        if (fieldType === 'title') {
          limit = (settings.metaTitleLimit as number) || 60
        } else {
          limit = (settings.metaDescriptionLimit as number) || 160
        }
      }
      setMaxCount(limit)
    }

    load()
  }, [fieldType, context])

  // Update display value and count when Payload's value changes
  useEffect(() => {
    const val = value || ''
    setDisplayValue(val)
    setCurrentCount(countJapaneseCharacters(val))
  }, [value])

  // Handle input changes with Japanese character counting and physical prevention
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newValue = e.target.value
      const newCount = countJapaneseCharacters(newValue)

      if (newCount <= maxCount) {
        setDisplayValue(newValue)
        setValue(newValue)
        setCurrentCount(newCount)
      } else {
        // Truncate to fit within limit
        let truncatedValue = ''
        for (let i = 0; i < newValue.length; i++) {
          const char = newValue[i]
          if (countJapaneseCharacters(truncatedValue + char) <= maxCount) {
            truncatedValue += char
          } else {
            break
          }
        }
        setDisplayValue(truncatedValue)
        setValue(truncatedValue)
        setCurrentCount(countJapaneseCharacters(truncatedValue))
      }
    },
    [setValue, maxCount],
  )

  const InputElement = isTextArea ? 'textarea' : 'input'

  const getCounterColor = () => {
    if (currentCount > maxCount) return '#e74c3c'
    if (currentCount > maxCount * 0.9) return '#f39c12'
    return '#27ae60'
  }

  return (
    <div className="field-type text">
      {label && (
        <div className="label-wrapper">
          <label className="field-label" htmlFor={`field-${path}`}>
            {label}
            {required && <span className="required"> *</span>}
          </label>
        </div>
      )}

      <div className="input-wrapper">
        <InputElement
          id={`field-${path}`}
          name={path}
          value={displayValue}
          onChange={handleChange}
          placeholder={placeholder}
          readOnly={readOnly}
          className={`field-input ${showError ? 'error' : ''}`}
          style={{
            width: '100%',
            padding: '8px 12px',
            border: `1px solid ${showError ? '#e74c3c' : '#ddd'}`,
            borderRadius: '4px',
            fontSize: '14px',
            ...(isTextArea && {
              resize: 'vertical' as const,
              minHeight: '80px',
            }),
          }}
          {...(isTextArea && { rows: 3 })}
        />

        <div
          style={{
            fontSize: '12px',
            marginTop: '4px',
            color: getCounterColor(),
            textAlign: 'right' as const,
            fontWeight: currentCount > maxCount * 0.9 ? '600' : 'normal',
          }}
        >
          {currentCount} / {maxCount} characters
          <span style={{ marginLeft: '8px', fontSize: '11px', color: '#95a5a6' }}>
            (full-width = 2, half-width = 1)
          </span>
        </div>

        {showError && errorMessage && (
          <div
            style={{
              color: '#e74c3c',
              fontSize: '12px',
              marginTop: '4px',
            }}
          >
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  )
}

export default CustomSeoTextField
