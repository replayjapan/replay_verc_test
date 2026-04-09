import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { AccordionBlock } from '@/blocks/Accordion/Component'
import { ActionCardGridBlock } from '@/blocks/ActionCardGrid/Component'
import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { CapabilitiesGridBlock } from '@/blocks/CapabilitiesGrid/Component'
import { ClientLogosBlock } from '@/blocks/ClientLogos/Component'
import { CompanyFactsBlock } from '@/blocks/CompanyFacts/Component'
import { ContactInfoBlock } from '@/blocks/ContactInfo/Component'
import { CenteredContentBlock } from '@/blocks/CenteredContent/Component'
import { CodeBlock } from '@/blocks/Code/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { DomainShowcaseBlock } from '@/blocks/DomainShowcase/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { HeroCarouselBlock } from '@/blocks/HeroCarousel/Component'
import { HeroHeaderBlock } from '@/blocks/HeroHeader/Component'
import { ImageGalleryBlock } from '@/blocks/ImageGallery/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { MetricsBarBlock } from '@/blocks/MetricsBar/Component'
import { NoticeBlock } from '@/blocks/Notice/Component'
import { PortfolioCardsBlock } from '@/blocks/PortfolioCards/Component'
import { ServicesBlockComponent } from '@/blocks/ServicesBlock/Component'
import { Split1x2Block } from '@/blocks/Split1x2/Component'
import { SplitSectionBlock } from '@/blocks/SplitSection/Component'
import { TabsBlock } from '@/blocks/Tabs/Component'
import { ThesisStatsBlock } from '@/blocks/ThesisStats/Component'

const blockComponents = {
  accordion: AccordionBlock,
  actionCardGrid: ActionCardGridBlock,
  archive: ArchiveBlock,
  capabilitiesGrid: CapabilitiesGridBlock,
  centeredContent: CenteredContentBlock,
  clientLogos: ClientLogosBlock,
  companyFacts: CompanyFactsBlock,
  contactInfo: ContactInfoBlock,
  code: CodeBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  domainShowcase: DomainShowcaseBlock,
  formBlock: FormBlock,
  heroCarousel: HeroCarouselBlock,
  heroHeader: HeroHeaderBlock,
  imageGallery: ImageGalleryBlock,
  mediaBlock: MediaBlock,
  metricsBar: MetricsBarBlock,
  notice: NoticeBlock,
  portfolioCards: PortfolioCardsBlock,
  servicesBlock: ServicesBlockComponent,
  split1x2: Split1x2Block,
  splitSection: SplitSectionBlock,
  tabs: TabsBlock,
  thesisStats: ThesisStatsBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              const bt = blockType as string
              const isFirstHero = index === 0 && (bt === 'heroCarousel' || bt === 'heroHeader')
              return (
                <div
                  className={isFirstHero ? '-mt-16' : ''}
                  key={index}
                >
                  {/* @ts-expect-error block component prop types vary per block */}
                  <Block {...block} />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
