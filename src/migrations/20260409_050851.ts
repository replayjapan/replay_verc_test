import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_accordion_heading_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_pages_blocks_accordion_background" AS ENUM('transparent', 'light-gray', 'brand-primary', 'brand-alt');
  CREATE TYPE "public"."enum_pages_blocks_accordion_spacing_density" AS ENUM('compact', 'default', 'spacious');
  CREATE TYPE "public"."enum_pages_blocks_action_card_grid_cards_media_type" AS ENUM('icon', 'image');
  CREATE TYPE "public"."enum_pages_blocks_action_card_grid_cards_icon" AS ENUM('Globe', 'Shield', 'BarChart3', 'Zap', 'Lock', 'Headphones', 'TrendingUp', 'Search', 'MessageSquare', 'CheckCircle', 'Star', 'Users');
  CREATE TYPE "public"."enum_pages_blocks_action_card_grid_cards_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_pages_blocks_action_card_grid_heading_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_pages_blocks_action_card_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_action_card_grid_card_style" AS ENUM('bordered', 'filled', 'minimal');
  CREATE TYPE "public"."enum_pages_blocks_action_card_grid_section_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_pages_blocks_action_card_grid_card_alignment" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_pages_blocks_action_card_grid_section_background" AS ENUM('transparent', 'light-gray', 'brand-primary', 'brand-alt');
  CREATE TYPE "public"."enum_pages_blocks_action_card_grid_spacing_density" AS ENUM('compact', 'default', 'spacious');
  CREATE TYPE "public"."enum_pages_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum_pages_blocks_archive_relation_to" AS ENUM('posts');
  CREATE TYPE "public"."enum_pages_blocks_cta_links_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_pages_blocks_cta_background_color" AS ENUM('white', 'lightGray', 'lightBlue', 'lightBeige');
  CREATE TYPE "public"."enum_pages_blocks_cta_spacing_density" AS ENUM('compact', 'default', 'spacious');
  CREATE TYPE "public"."enum_pages_blocks_capabilities_grid_heading_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_pages_blocks_centered_content_heading_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_pages_blocks_centered_content_alignment" AS ENUM('center', 'left');
  CREATE TYPE "public"."enum_pages_blocks_centered_content_width" AS ENUM('narrow', 'medium', 'wide', 'full');
  CREATE TYPE "public"."enum_pages_blocks_centered_content_background_color" AS ENUM('white', 'lightGray', 'lightBlue', 'lightBeige');
  CREATE TYPE "public"."enum_pages_blocks_centered_content_primary_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_pages_blocks_centered_content_secondary_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_pages_blocks_centered_content_spacing_density" AS ENUM('compact', 'default', 'spacious');
  CREATE TYPE "public"."enum_pages_blocks_client_logos_heading_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_pages_blocks_company_facts_heading_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_pages_blocks_contact_info_heading_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_pages_blocks_code_language" AS ENUM('typescript', 'javascript', 'css');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_pages_blocks_content_background_color" AS ENUM('white', 'lightGray', 'brand', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_content_spacing_density" AS ENUM('compact', 'default', 'spacious');
  CREATE TYPE "public"."enum_pages_blocks_domain_showcase_source_mode" AS ENUM('featured', 'category', 'manual');
  CREATE TYPE "public"."enum_pages_blocks_domain_showcase_heading_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_pages_blocks_domain_showcase_background_color" AS ENUM('white', 'lightGray', 'brand', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_domain_showcase_spacing_density" AS ENUM('compact', 'default', 'spacious');
  CREATE TYPE "public"."enum_sl_pri_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_sl_sec_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_pages_blocks_hero_carousel_text_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_sc_pri_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_sc_sec_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_pages_blocks_hero_carousel_height" AS ENUM('standard', 'tall', 'short');
  CREATE TYPE "public"."enum_pages_blocks_hero_header_size" AS ENUM('full', 'medium', 'short');
  CREATE TYPE "public"."enum_pages_blocks_hero_header_heading_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_hh_pri_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_pages_blocks_image_gallery_heading_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_pages_blocks_image_gallery_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_image_gallery_aspect_ratio" AS ENUM('original', 'square', '16:9', '4:3');
  CREATE TYPE "public"."enum_pages_blocks_image_gallery_gap" AS ENUM('tight', 'normal', 'wide');
  CREATE TYPE "public"."enum_pages_blocks_image_gallery_caption_alignment" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_pages_blocks_image_gallery_background_color" AS ENUM('white', 'lightGray', 'brand', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_image_gallery_spacing_density" AS ENUM('compact', 'default', 'spacious');
  CREATE TYPE "public"."enum_pages_blocks_metrics_bar_items_icon" AS ENUM('Globe', 'Heart', 'Zap', 'Award', 'TrendingUp', 'Users', 'Star', 'Shield', 'Target');
  CREATE TYPE "public"."enum_pages_blocks_metrics_bar_mode" AS ENUM('bar', 'split');
  CREATE TYPE "public"."enum_pages_blocks_metrics_bar_heading_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_pages_blocks_metrics_bar_background" AS ENUM('transparent', 'brand-primary', 'brand-alt', 'light-gray');
  CREATE TYPE "public"."enum_pages_blocks_metrics_bar_big_number_alignment" AS ENUM('center', 'right');
  CREATE TYPE "public"."enum_pages_blocks_metrics_bar_spacing_density" AS ENUM('compact', 'default', 'spacious');
  CREATE TYPE "public"."enum_pages_blocks_notice_variant" AS ENUM('info', 'warning', 'success', 'tip', 'slim');
  CREATE TYPE "public"."enum_pages_blocks_notice_custom_icon" AS ENUM('Info', 'AlertTriangle', 'CheckCircle', 'Lightbulb', 'Star', 'Bell', 'Shield', 'Zap', 'Heart');
  CREATE TYPE "public"."enum_pages_blocks_notice_heading_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_pages_blocks_portfolio_cards_heading_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_pages_blocks_services_block_heading_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_pages_blocks_services_block_layout" AS ENUM('grid', 'list');
  CREATE TYPE "public"."enum_pages_blocks_services_block_spacing_density" AS ENUM('compact', 'default', 'spacious');
  CREATE TYPE "public"."enum_pages_blocks_split1x2_small_column_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_pages_blocks_split1x2_heading_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_pages_blocks_split1x2_small_column_display_type" AS ENUM('backgroundImage', 'image', 'textOnly');
  CREATE TYPE "public"."enum_pages_blocks_split1x2_background_color" AS ENUM('white', 'lightGray', 'lightBlue', 'lightBeige');
  CREATE TYPE "public"."enum_pages_blocks_split1x2_spacing_density" AS ENUM('compact', 'default', 'spacious');
  CREATE TYPE "public"."enum_pages_blocks_split_section_heading_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_pages_blocks_split_section_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_pages_blocks_split_section_layout_style" AS ENUM('standard', 'fullBleed');
  CREATE TYPE "public"."enum_pages_blocks_split_section_background_color" AS ENUM('white', 'lightGray', 'lightBlue', 'lightBeige');
  CREATE TYPE "public"."enum_pages_blocks_split_section_primary_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_pages_blocks_split_section_secondary_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_pages_blocks_split_section_spacing_density" AS ENUM('compact', 'default', 'spacious');
  CREATE TYPE "public"."enum_pages_blocks_tabs_tabs_tab_icon" AS ENUM('Shield', 'Zap', 'Star', 'Globe', 'Heart', 'Bell');
  CREATE TYPE "public"."enum_pages_blocks_tabs_heading_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_pages_blocks_tabs_tab_alignment" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_pages_blocks_tabs_tab_style" AS ENUM('underline', 'boxed', 'pill');
  CREATE TYPE "public"."enum_pages_blocks_tabs_background" AS ENUM('transparent', 'light-gray', 'brand-primary', 'brand-alt');
  CREATE TYPE "public"."enum_pages_blocks_tabs_spacing_density" AS ENUM('compact', 'default', 'spacious');
  CREATE TYPE "public"."enum_pages_blocks_thesis_stats_heading_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_heading_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_background" AS ENUM('transparent', 'light-gray', 'brand-primary', 'brand-alt');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_spacing_density" AS ENUM('compact', 'default', 'spacious');
  CREATE TYPE "public"."enum__pages_v_blocks_action_card_grid_cards_media_type" AS ENUM('icon', 'image');
  CREATE TYPE "public"."enum__pages_v_blocks_action_card_grid_cards_icon" AS ENUM('Globe', 'Shield', 'BarChart3', 'Zap', 'Lock', 'Headphones', 'TrendingUp', 'Search', 'MessageSquare', 'CheckCircle', 'Star', 'Users');
  CREATE TYPE "public"."enum__pages_v_blocks_action_card_grid_cards_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__pages_v_blocks_action_card_grid_heading_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_action_card_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_action_card_grid_card_style" AS ENUM('bordered', 'filled', 'minimal');
  CREATE TYPE "public"."enum__pages_v_blocks_action_card_grid_section_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_action_card_grid_card_alignment" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__pages_v_blocks_action_card_grid_section_background" AS ENUM('transparent', 'light-gray', 'brand-primary', 'brand-alt');
  CREATE TYPE "public"."enum__pages_v_blocks_action_card_grid_spacing_density" AS ENUM('compact', 'default', 'spacious');
  CREATE TYPE "public"."enum__pages_v_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum__pages_v_blocks_archive_relation_to" AS ENUM('posts');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_links_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_background_color" AS ENUM('white', 'lightGray', 'lightBlue', 'lightBeige');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_spacing_density" AS ENUM('compact', 'default', 'spacious');
  CREATE TYPE "public"."enum__pages_v_blocks_capabilities_grid_heading_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_centered_content_heading_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_centered_content_alignment" AS ENUM('center', 'left');
  CREATE TYPE "public"."enum__pages_v_blocks_centered_content_width" AS ENUM('narrow', 'medium', 'wide', 'full');
  CREATE TYPE "public"."enum__pages_v_blocks_centered_content_background_color" AS ENUM('white', 'lightGray', 'lightBlue', 'lightBeige');
  CREATE TYPE "public"."enum__pages_v_blocks_centered_content_primary_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__pages_v_blocks_centered_content_secondary_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__pages_v_blocks_centered_content_spacing_density" AS ENUM('compact', 'default', 'spacious');
  CREATE TYPE "public"."enum__pages_v_blocks_client_logos_heading_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_company_facts_heading_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_info_heading_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_code_language" AS ENUM('typescript', 'javascript', 'css');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__pages_v_blocks_content_background_color" AS ENUM('white', 'lightGray', 'brand', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_content_spacing_density" AS ENUM('compact', 'default', 'spacious');
  CREATE TYPE "public"."enum__pages_v_blocks_domain_showcase_source_mode" AS ENUM('featured', 'category', 'manual');
  CREATE TYPE "public"."enum__pages_v_blocks_domain_showcase_heading_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_domain_showcase_background_color" AS ENUM('white', 'lightGray', 'brand', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_domain_showcase_spacing_density" AS ENUM('compact', 'default', 'spacious');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_carousel_text_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_carousel_height" AS ENUM('standard', 'tall', 'short');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_header_size" AS ENUM('full', 'medium', 'short');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_header_heading_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_image_gallery_heading_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_image_gallery_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_image_gallery_aspect_ratio" AS ENUM('original', 'square', '16:9', '4:3');
  CREATE TYPE "public"."enum__pages_v_blocks_image_gallery_gap" AS ENUM('tight', 'normal', 'wide');
  CREATE TYPE "public"."enum__pages_v_blocks_image_gallery_caption_alignment" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__pages_v_blocks_image_gallery_background_color" AS ENUM('white', 'lightGray', 'brand', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_image_gallery_spacing_density" AS ENUM('compact', 'default', 'spacious');
  CREATE TYPE "public"."enum__pages_v_blocks_metrics_bar_items_icon" AS ENUM('Globe', 'Heart', 'Zap', 'Award', 'TrendingUp', 'Users', 'Star', 'Shield', 'Target');
  CREATE TYPE "public"."enum__pages_v_blocks_metrics_bar_mode" AS ENUM('bar', 'split');
  CREATE TYPE "public"."enum__pages_v_blocks_metrics_bar_heading_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_metrics_bar_background" AS ENUM('transparent', 'brand-primary', 'brand-alt', 'light-gray');
  CREATE TYPE "public"."enum__pages_v_blocks_metrics_bar_big_number_alignment" AS ENUM('center', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_metrics_bar_spacing_density" AS ENUM('compact', 'default', 'spacious');
  CREATE TYPE "public"."enum__pages_v_blocks_notice_variant" AS ENUM('info', 'warning', 'success', 'tip', 'slim');
  CREATE TYPE "public"."enum__pages_v_blocks_notice_custom_icon" AS ENUM('Info', 'AlertTriangle', 'CheckCircle', 'Lightbulb', 'Star', 'Bell', 'Shield', 'Zap', 'Heart');
  CREATE TYPE "public"."enum__pages_v_blocks_notice_heading_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_portfolio_cards_heading_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_services_block_heading_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_services_block_layout" AS ENUM('grid', 'list');
  CREATE TYPE "public"."enum__pages_v_blocks_services_block_spacing_density" AS ENUM('compact', 'default', 'spacious');
  CREATE TYPE "public"."enum__pages_v_blocks_split1x2_small_column_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_split1x2_heading_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_split1x2_small_column_display_type" AS ENUM('backgroundImage', 'image', 'textOnly');
  CREATE TYPE "public"."enum__pages_v_blocks_split1x2_background_color" AS ENUM('white', 'lightGray', 'lightBlue', 'lightBeige');
  CREATE TYPE "public"."enum__pages_v_blocks_split1x2_spacing_density" AS ENUM('compact', 'default', 'spacious');
  CREATE TYPE "public"."enum__pages_v_blocks_split_section_heading_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_split_section_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_split_section_layout_style" AS ENUM('standard', 'fullBleed');
  CREATE TYPE "public"."enum__pages_v_blocks_split_section_background_color" AS ENUM('white', 'lightGray', 'lightBlue', 'lightBeige');
  CREATE TYPE "public"."enum__pages_v_blocks_split_section_primary_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__pages_v_blocks_split_section_secondary_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__pages_v_blocks_split_section_spacing_density" AS ENUM('compact', 'default', 'spacious');
  CREATE TYPE "public"."enum__pages_v_blocks_tabs_tabs_tab_icon" AS ENUM('Shield', 'Zap', 'Star', 'Globe', 'Heart', 'Bell');
  CREATE TYPE "public"."enum__pages_v_blocks_tabs_heading_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_tabs_tab_alignment" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum__pages_v_blocks_tabs_tab_style" AS ENUM('underline', 'boxed', 'pill');
  CREATE TYPE "public"."enum__pages_v_blocks_tabs_background" AS ENUM('transparent', 'light-gray', 'brand-primary', 'brand-alt');
  CREATE TYPE "public"."enum__pages_v_blocks_tabs_spacing_density" AS ENUM('compact', 'default', 'spacious');
  CREATE TYPE "public"."enum__pages_v_blocks_thesis_stats_heading_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_domains_domain_script" AS ENUM('latin', 'japanese');
  CREATE TYPE "public"."enum_domains_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__domains_v_version_domain_script" AS ENUM('latin', 'japanese');
  CREATE TYPE "public"."enum__domains_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_domain_sets_policy" AS ENUM('bundle_only', 'preferred_bundle', 'allow_individual');
  CREATE TYPE "public"."enum_domain_inquiries_budget" AS ENUM('under_100k', '100k_300k', '300k_500k', '500k_1m', 'over_1m');
  CREATE TYPE "public"."enum_domain_inquiries_status" AS ENUM('new', 'contacted', 'closed');
  CREATE TYPE "public"."enum_domain_category_icon" AS ENUM('buildings', 'shopping-cart', 'server', 'credit-card', 'briefcase', 'heart', 'utensils', 'plane', 'graduation-cap', 'car', 'gamepad', 'gem');
  CREATE TYPE "public"."enum_services_blocks_accordion_heading_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_services_blocks_accordion_background" AS ENUM('transparent', 'light-gray', 'brand-primary', 'brand-alt');
  CREATE TYPE "public"."enum_services_blocks_accordion_spacing_density" AS ENUM('compact', 'default', 'spacious');
  CREATE TYPE "public"."enum_services_blocks_action_card_grid_cards_media_type" AS ENUM('icon', 'image');
  CREATE TYPE "public"."enum_services_blocks_action_card_grid_cards_icon" AS ENUM('Globe', 'Shield', 'BarChart3', 'Zap', 'Lock', 'Headphones', 'TrendingUp', 'Search', 'MessageSquare', 'CheckCircle', 'Star', 'Users');
  CREATE TYPE "public"."enum_services_blocks_action_card_grid_cards_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_services_blocks_action_card_grid_heading_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_services_blocks_action_card_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_services_blocks_action_card_grid_card_style" AS ENUM('bordered', 'filled', 'minimal');
  CREATE TYPE "public"."enum_services_blocks_action_card_grid_section_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_services_blocks_action_card_grid_card_alignment" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_services_blocks_action_card_grid_section_background" AS ENUM('transparent', 'light-gray', 'brand-primary', 'brand-alt');
  CREATE TYPE "public"."enum_services_blocks_action_card_grid_spacing_density" AS ENUM('compact', 'default', 'spacious');
  CREATE TYPE "public"."enum_services_blocks_cta_links_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_services_blocks_cta_background_color" AS ENUM('white', 'lightGray', 'lightBlue', 'lightBeige');
  CREATE TYPE "public"."enum_services_blocks_cta_spacing_density" AS ENUM('compact', 'default', 'spacious');
  CREATE TYPE "public"."enum_services_blocks_centered_content_heading_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_services_blocks_centered_content_alignment" AS ENUM('center', 'left');
  CREATE TYPE "public"."enum_services_blocks_centered_content_width" AS ENUM('narrow', 'medium', 'wide', 'full');
  CREATE TYPE "public"."enum_services_blocks_centered_content_background_color" AS ENUM('white', 'lightGray', 'lightBlue', 'lightBeige');
  CREATE TYPE "public"."enum_services_blocks_centered_content_primary_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_services_blocks_centered_content_secondary_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_services_blocks_centered_content_spacing_density" AS ENUM('compact', 'default', 'spacious');
  CREATE TYPE "public"."enum_services_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_services_blocks_content_columns_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_services_blocks_content_background_color" AS ENUM('white', 'lightGray', 'brand', 'dark');
  CREATE TYPE "public"."enum_services_blocks_content_spacing_density" AS ENUM('compact', 'default', 'spacious');
  CREATE TYPE "public"."enum_services_blocks_hero_carousel_text_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_services_blocks_hero_carousel_height" AS ENUM('standard', 'tall', 'short');
  CREATE TYPE "public"."enum_services_blocks_image_gallery_heading_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_services_blocks_image_gallery_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_services_blocks_image_gallery_aspect_ratio" AS ENUM('original', 'square', '16:9', '4:3');
  CREATE TYPE "public"."enum_services_blocks_image_gallery_gap" AS ENUM('tight', 'normal', 'wide');
  CREATE TYPE "public"."enum_services_blocks_image_gallery_caption_alignment" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_services_blocks_image_gallery_background_color" AS ENUM('white', 'lightGray', 'brand', 'dark');
  CREATE TYPE "public"."enum_services_blocks_image_gallery_spacing_density" AS ENUM('compact', 'default', 'spacious');
  CREATE TYPE "public"."enum_services_blocks_metrics_bar_items_icon" AS ENUM('Globe', 'Heart', 'Zap', 'Award', 'TrendingUp', 'Users', 'Star', 'Shield', 'Target');
  CREATE TYPE "public"."enum_services_blocks_metrics_bar_mode" AS ENUM('bar', 'split');
  CREATE TYPE "public"."enum_services_blocks_metrics_bar_heading_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_services_blocks_metrics_bar_background" AS ENUM('transparent', 'brand-primary', 'brand-alt', 'light-gray');
  CREATE TYPE "public"."enum_services_blocks_metrics_bar_big_number_alignment" AS ENUM('center', 'right');
  CREATE TYPE "public"."enum_services_blocks_metrics_bar_spacing_density" AS ENUM('compact', 'default', 'spacious');
  CREATE TYPE "public"."enum_services_blocks_notice_variant" AS ENUM('info', 'warning', 'success', 'tip', 'slim');
  CREATE TYPE "public"."enum_services_blocks_notice_custom_icon" AS ENUM('Info', 'AlertTriangle', 'CheckCircle', 'Lightbulb', 'Star', 'Bell', 'Shield', 'Zap', 'Heart');
  CREATE TYPE "public"."enum_services_blocks_notice_heading_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_services_blocks_split1x2_small_column_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_services_blocks_split1x2_heading_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_services_blocks_split1x2_small_column_display_type" AS ENUM('backgroundImage', 'image', 'textOnly');
  CREATE TYPE "public"."enum_services_blocks_split1x2_background_color" AS ENUM('white', 'lightGray', 'lightBlue', 'lightBeige');
  CREATE TYPE "public"."enum_services_blocks_split1x2_spacing_density" AS ENUM('compact', 'default', 'spacious');
  CREATE TYPE "public"."enum_services_blocks_split_section_heading_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_services_blocks_split_section_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_services_blocks_split_section_layout_style" AS ENUM('standard', 'fullBleed');
  CREATE TYPE "public"."enum_services_blocks_split_section_background_color" AS ENUM('white', 'lightGray', 'lightBlue', 'lightBeige');
  CREATE TYPE "public"."enum_services_blocks_split_section_primary_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_services_blocks_split_section_secondary_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_services_blocks_split_section_spacing_density" AS ENUM('compact', 'default', 'spacious');
  CREATE TYPE "public"."enum_services_blocks_tabs_tabs_tab_icon" AS ENUM('Shield', 'Zap', 'Star', 'Globe', 'Heart', 'Bell');
  CREATE TYPE "public"."enum_services_blocks_tabs_heading_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_services_blocks_tabs_tab_alignment" AS ENUM('left', 'center');
  CREATE TYPE "public"."enum_services_blocks_tabs_tab_style" AS ENUM('underline', 'boxed', 'pill');
  CREATE TYPE "public"."enum_services_blocks_tabs_background" AS ENUM('transparent', 'light-gray', 'brand-primary', 'brand-alt');
  CREATE TYPE "public"."enum_services_blocks_tabs_spacing_density" AS ENUM('compact', 'default', 'spacious');
  CREATE TYPE "public"."enum_services_icon" AS ENUM('smartphone', 'barchart', 'monitor', 'code', 'image', 'globe', 'share', 'mail', 'megaphone', 'camera', 'pen', 'briefcase');
  CREATE TYPE "public"."enum_videos_video_type" AS ENUM('tutorial', 'demo', 'webinar', 'presentation', 'interview', 'testimonial');
  CREATE TYPE "public"."enum_videos_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__videos_v_version_video_type" AS ENUM('tutorial', 'demo', 'webinar', 'presentation', 'interview', 'testimonial');
  CREATE TYPE "public"."enum__videos_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_portfolios_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__portfolios_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_articles_article_type" AS ENUM('article', 'case-study', 'whitepaper', 'documentation', 'research');
  CREATE TYPE "public"."enum_articles_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__articles_v_version_article_type" AS ENUM('article', 'case-study', 'whitepaper', 'documentation', 'research');
  CREATE TYPE "public"."enum__articles_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_redirects_to_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_forms_confirmation_type" AS ENUM('message', 'redirect');
  CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_header_nav_items_submenu_items_icon" AS ENUM('none', 'home', 'grid', 'users', 'folder', 'file-text', 'mail', 'search', 'user', 'shopping-cart', 'settings', 'info');
  CREATE TYPE "public"."enum_header_nav_items_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_header_nav_items_nav_group" AS ENUM('primary', 'utility');
  CREATE TYPE "public"."enum_header_nav_items_icon" AS ENUM('none', 'home', 'grid', 'users', 'folder', 'file-text', 'mail', 'search', 'user', 'shopping-cart', 'settings', 'info');
  CREATE TYPE "public"."enum_header_nav_items_submenu_type" AS ENUM('none', 'simple', 'multiColumn', 'mega');
  CREATE TYPE "public"."enum_header_nav_items_submenu_columns" AS ENUM('1', '2', '3', '4');
  CREATE TYPE "public"."enum_header_nav_position" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_header_separator" AS ENUM('none', 'border');
  CREATE TYPE "public"."enum_header_search_display" AS ENUM('icon', 'hidden');
  CREATE TYPE "public"."enum_footer_nav_items_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_site_settings_language" AS ENUM('english', 'japanese');
  CREATE TYPE "public"."enum_site_settings_locale" AS ENUM('en-US', 'en-GB', 'ja-JP');
  CREATE TYPE "public"."enum_site_settings_typography_heading_weight" AS ENUM('400', '500', '600', '700');
  CREATE TYPE "public"."enum_site_settings_typography_body_weight" AS ENUM('300', '400', '500');
  CREATE TYPE "public"."enum_site_settings_typography_base_size" AS ENUM('14px', '16px', '18px');
  CREATE TYPE "public"."enum_site_settings_layout_container_width" AS ENUM('960px', '1140px', '1320px', '100%');
  CREATE TYPE "public"."enum_site_settings_layout_border_radius" AS ENUM('0px', '8px', '12px', '9999px');
  CREATE TYPE "public"."enum_cta_settings_groups_default_button_color" AS ENUM('brand-primary', 'brand-alt', 'white', 'dark');
  CREATE TYPE "public"."enum_cta_settings_groups_default_button_variant" AS ENUM('filled', 'outline', 'ghost');
  CREATE TYPE "public"."enum_cta_settings_groups_default_button_size" AS ENUM('small', 'default', 'large');
  CREATE TYPE "public"."enum_domains_settings_display_sort_field" AS ENUM('domainName', 'registrationDate');
  CREATE TYPE "public"."enum_domains_settings_display_sort_dir" AS ENUM('asc', 'desc');
  CREATE TYPE "public"."enum_domains_settings_currency_code" AS ENUM('USD', 'JPY');
  CREATE TABLE "pages_blocks_accordion_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" jsonb,
  	"category" varchar,
  	"default_open" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_heading" varchar,
  	"heading_alignment" "enum_pages_blocks_accordion_heading_alignment" DEFAULT 'center',
  	"section_subtitle" varchar,
  	"allow_multiple_open" boolean DEFAULT false,
  	"default_first_open" boolean DEFAULT false,
  	"background" "enum_pages_blocks_accordion_background" DEFAULT 'transparent',
  	"show_top_divider" boolean DEFAULT false,
  	"spacing_density" "enum_pages_blocks_accordion_spacing_density" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_action_card_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_type" "enum_pages_blocks_action_card_grid_cards_media_type" DEFAULT 'icon',
  	"icon" "enum_pages_blocks_action_card_grid_cards_icon",
  	"image_id" integer,
  	"title" varchar,
  	"description" varchar,
  	"link_label" varchar,
  	"link_type" "enum_pages_blocks_action_card_grid_cards_link_type" DEFAULT 'internal',
  	"link_external_url" varchar,
  	"link_new_tab" boolean DEFAULT false,
  	"link_anchor" varchar,
  	"link_aria_label" varchar,
  	"link_nofollow" boolean DEFAULT false,
  	"link_noreferrer" boolean DEFAULT false,
  	"link_sponsored" boolean DEFAULT false,
  	"link_utm_source" varchar,
  	"link_utm_medium" varchar,
  	"link_utm_campaign" varchar,
  	"link_utm_content" varchar
  );
  
  CREATE TABLE "pages_blocks_action_card_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_heading" varchar,
  	"heading_alignment" "enum_pages_blocks_action_card_grid_heading_alignment" DEFAULT 'center',
  	"section_subtitle" varchar,
  	"columns" "enum_pages_blocks_action_card_grid_columns" DEFAULT '3',
  	"card_style" "enum_pages_blocks_action_card_grid_card_style" DEFAULT 'bordered',
  	"section_alignment" "enum_pages_blocks_action_card_grid_section_alignment" DEFAULT 'center',
  	"card_alignment" "enum_pages_blocks_action_card_grid_card_alignment" DEFAULT 'center',
  	"section_background" "enum_pages_blocks_action_card_grid_section_background" DEFAULT 'transparent',
  	"show_top_divider" boolean DEFAULT false,
  	"spacing_density" "enum_pages_blocks_action_card_grid_spacing_density" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"intro_content" jsonb,
  	"populate_by" "enum_pages_blocks_archive_populate_by" DEFAULT 'collection',
  	"relation_to" "enum_pages_blocks_archive_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 10,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_label" varchar,
  	"link_type" "enum_pages_blocks_cta_links_link_type" DEFAULT 'internal',
  	"link_external_url" varchar,
  	"link_new_tab" boolean DEFAULT false,
  	"link_anchor" varchar,
  	"link_aria_label" varchar,
  	"link_nofollow" boolean DEFAULT false,
  	"link_noreferrer" boolean DEFAULT false,
  	"link_sponsored" boolean DEFAULT false,
  	"link_utm_source" varchar,
  	"link_utm_medium" varchar,
  	"link_utm_campaign" varchar,
  	"link_utm_content" varchar
  );
  
  CREATE TABLE "pages_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"background_color" "enum_pages_blocks_cta_background_color" DEFAULT 'lightGray',
  	"show_top_divider" boolean DEFAULT false,
  	"spacing_density" "enum_pages_blocks_cta_spacing_density" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_capabilities_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_capabilities_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"heading_alignment" "enum_pages_blocks_capabilities_grid_heading_alignment" DEFAULT 'left',
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_centered_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"heading_alignment" "enum_pages_blocks_centered_content_heading_alignment" DEFAULT 'center',
  	"subheading" varchar,
  	"content" jsonb,
  	"alignment" "enum_pages_blocks_centered_content_alignment" DEFAULT 'center',
  	"width" "enum_pages_blocks_centered_content_width" DEFAULT 'medium',
  	"background_color" "enum_pages_blocks_centered_content_background_color" DEFAULT 'white',
  	"primary_link_label" varchar,
  	"primary_link_type" "enum_pages_blocks_centered_content_primary_link_type" DEFAULT 'internal',
  	"primary_link_external_url" varchar,
  	"primary_link_new_tab" boolean DEFAULT false,
  	"primary_link_anchor" varchar,
  	"primary_link_aria_label" varchar,
  	"primary_link_nofollow" boolean DEFAULT false,
  	"primary_link_noreferrer" boolean DEFAULT false,
  	"primary_link_sponsored" boolean DEFAULT false,
  	"primary_link_utm_source" varchar,
  	"primary_link_utm_medium" varchar,
  	"primary_link_utm_campaign" varchar,
  	"primary_link_utm_content" varchar,
  	"secondary_link_label" varchar,
  	"secondary_link_type" "enum_pages_blocks_centered_content_secondary_link_type" DEFAULT 'internal',
  	"secondary_link_external_url" varchar,
  	"secondary_link_new_tab" boolean DEFAULT false,
  	"secondary_link_anchor" varchar,
  	"secondary_link_aria_label" varchar,
  	"secondary_link_nofollow" boolean DEFAULT false,
  	"secondary_link_noreferrer" boolean DEFAULT false,
  	"secondary_link_sponsored" boolean DEFAULT false,
  	"secondary_link_utm_source" varchar,
  	"secondary_link_utm_medium" varchar,
  	"secondary_link_utm_campaign" varchar,
  	"secondary_link_utm_content" varchar,
  	"show_top_divider" boolean DEFAULT false,
  	"spacing_density" "enum_pages_blocks_centered_content_spacing_density" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_client_logos_clients" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"logo_id" integer
  );
  
  CREATE TABLE "pages_blocks_client_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"heading_alignment" "enum_pages_blocks_client_logos_heading_alignment" DEFAULT 'left',
  	"subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_company_facts_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "pages_blocks_company_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"heading_alignment" "enum_pages_blocks_company_facts_heading_alignment" DEFAULT 'center',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_info" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"company_name" varchar,
  	"heading_alignment" "enum_pages_blocks_contact_info_heading_alignment" DEFAULT 'left',
  	"description" varchar,
  	"address" varchar,
  	"phone" varchar,
  	"email_note" varchar,
  	"hours" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_code" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"language" "enum_pages_blocks_code_language" DEFAULT 'typescript',
  	"code" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_pages_blocks_content_columns_size" DEFAULT 'oneThird',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_label" varchar,
  	"link_type" "enum_pages_blocks_content_columns_link_type" DEFAULT 'internal',
  	"link_external_url" varchar,
  	"link_new_tab" boolean DEFAULT false,
  	"link_anchor" varchar,
  	"link_aria_label" varchar,
  	"link_nofollow" boolean DEFAULT false,
  	"link_noreferrer" boolean DEFAULT false,
  	"link_sponsored" boolean DEFAULT false,
  	"link_utm_source" varchar,
  	"link_utm_medium" varchar,
  	"link_utm_campaign" varchar,
  	"link_utm_content" varchar
  );
  
  CREATE TABLE "pages_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_color" "enum_pages_blocks_content_background_color" DEFAULT 'white',
  	"show_top_divider" boolean DEFAULT false,
  	"spacing_density" "enum_pages_blocks_content_spacing_density" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_domain_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"source_mode" "enum_pages_blocks_domain_showcase_source_mode" DEFAULT 'featured',
  	"limit" numeric DEFAULT 6,
  	"title" varchar,
  	"heading_alignment" "enum_pages_blocks_domain_showcase_heading_alignment" DEFAULT 'center',
  	"subtitle" varchar,
  	"show_view_all" boolean DEFAULT true,
  	"background_color" "enum_pages_blocks_domain_showcase_background_color" DEFAULT 'white',
  	"show_top_divider" boolean DEFAULT false,
  	"spacing_density" "enum_pages_blocks_domain_showcase_spacing_density" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_hero_carousel_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"title" varchar,
  	"description" varchar,
  	"primary_link_label" varchar,
  	"primary_link_type" "enum_sl_pri_link_type" DEFAULT 'internal',
  	"primary_link_external_url" varchar,
  	"primary_link_new_tab" boolean DEFAULT false,
  	"primary_link_anchor" varchar,
  	"primary_link_aria_label" varchar,
  	"primary_link_nofollow" boolean DEFAULT false,
  	"primary_link_noreferrer" boolean DEFAULT false,
  	"primary_link_sponsored" boolean DEFAULT false,
  	"primary_link_utm_source" varchar,
  	"primary_link_utm_medium" varchar,
  	"primary_link_utm_campaign" varchar,
  	"primary_link_utm_content" varchar,
  	"secondary_link_label" varchar,
  	"secondary_link_type" "enum_sl_sec_link_type" DEFAULT 'internal',
  	"secondary_link_external_url" varchar,
  	"secondary_link_new_tab" boolean DEFAULT false,
  	"secondary_link_anchor" varchar,
  	"secondary_link_aria_label" varchar,
  	"secondary_link_nofollow" boolean DEFAULT false,
  	"secondary_link_noreferrer" boolean DEFAULT false,
  	"secondary_link_sponsored" boolean DEFAULT false,
  	"secondary_link_utm_source" varchar,
  	"secondary_link_utm_medium" varchar,
  	"secondary_link_utm_campaign" varchar,
  	"secondary_link_utm_content" varchar
  );
  
  CREATE TABLE "pages_blocks_hero_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"use_shared_content" boolean DEFAULT false,
  	"text_alignment" "enum_pages_blocks_hero_carousel_text_alignment" DEFAULT 'left',
  	"shared_content_title" varchar,
  	"shared_content_description" varchar,
  	"shared_content_primary_link_label" varchar,
  	"shared_content_primary_link_type" "enum_sc_pri_link_type" DEFAULT 'internal',
  	"shared_content_primary_link_external_url" varchar,
  	"shared_content_primary_link_new_tab" boolean DEFAULT false,
  	"shared_content_primary_link_anchor" varchar,
  	"shared_content_primary_link_aria_label" varchar,
  	"shared_content_primary_link_nofollow" boolean DEFAULT false,
  	"shared_content_primary_link_noreferrer" boolean DEFAULT false,
  	"shared_content_primary_link_sponsored" boolean DEFAULT false,
  	"shared_content_primary_link_utm_source" varchar,
  	"shared_content_primary_link_utm_medium" varchar,
  	"shared_content_primary_link_utm_campaign" varchar,
  	"shared_content_primary_link_utm_content" varchar,
  	"shared_content_secondary_link_label" varchar,
  	"shared_content_secondary_link_type" "enum_sc_sec_link_type" DEFAULT 'internal',
  	"shared_content_secondary_link_external_url" varchar,
  	"shared_content_secondary_link_new_tab" boolean DEFAULT false,
  	"shared_content_secondary_link_anchor" varchar,
  	"shared_content_secondary_link_aria_label" varchar,
  	"shared_content_secondary_link_nofollow" boolean DEFAULT false,
  	"shared_content_secondary_link_noreferrer" boolean DEFAULT false,
  	"shared_content_secondary_link_sponsored" boolean DEFAULT false,
  	"shared_content_secondary_link_utm_source" varchar,
  	"shared_content_secondary_link_utm_medium" varchar,
  	"shared_content_secondary_link_utm_campaign" varchar,
  	"shared_content_secondary_link_utm_content" varchar,
  	"height" "enum_pages_blocks_hero_carousel_height" DEFAULT 'standard',
  	"show_arrows" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_hero_header_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"heading" varchar,
  	"subtitle" varchar,
  	"cta_label" varchar,
  	"cta_url" varchar
  );
  
  CREATE TABLE "pages_blocks_hero_header" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_pages_blocks_hero_header_size" DEFAULT 'medium',
  	"title" varchar,
  	"subtitle" varchar,
  	"image_id" integer,
  	"heading_alignment" "enum_pages_blocks_hero_header_heading_alignment" DEFAULT 'left',
  	"primary_link_label" varchar,
  	"primary_link_type" "enum_hh_pri_link_type" DEFAULT 'internal',
  	"primary_link_external_url" varchar,
  	"primary_link_new_tab" boolean DEFAULT false,
  	"primary_link_anchor" varchar,
  	"primary_link_aria_label" varchar,
  	"primary_link_nofollow" boolean DEFAULT false,
  	"primary_link_noreferrer" boolean DEFAULT false,
  	"primary_link_sponsored" boolean DEFAULT false,
  	"primary_link_utm_source" varchar,
  	"primary_link_utm_medium" varchar,
  	"primary_link_utm_campaign" varchar,
  	"primary_link_utm_content" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_image_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "pages_blocks_image_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_heading" varchar,
  	"heading_alignment" "enum_pages_blocks_image_gallery_heading_alignment" DEFAULT 'center',
  	"columns" "enum_pages_blocks_image_gallery_columns" DEFAULT '3',
  	"aspect_ratio" "enum_pages_blocks_image_gallery_aspect_ratio" DEFAULT '16:9',
  	"gap" "enum_pages_blocks_image_gallery_gap" DEFAULT 'normal',
  	"caption_alignment" "enum_pages_blocks_image_gallery_caption_alignment" DEFAULT 'left',
  	"lightbox" boolean DEFAULT false,
  	"background_color" "enum_pages_blocks_image_gallery_background_color" DEFAULT 'white',
  	"show_top_divider" boolean DEFAULT false,
  	"spacing_density" "enum_pages_blocks_image_gallery_spacing_density" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_metrics_bar_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"prefix" varchar,
  	"number" numeric,
  	"suffix" varchar,
  	"label" varchar,
  	"icon" "enum_pages_blocks_metrics_bar_items_icon"
  );
  
  CREATE TABLE "pages_blocks_metrics_bar" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"mode" "enum_pages_blocks_metrics_bar_mode" DEFAULT 'bar',
  	"section_heading" varchar,
  	"heading_alignment" "enum_pages_blocks_metrics_bar_heading_alignment" DEFAULT 'center',
  	"background" "enum_pages_blocks_metrics_bar_background" DEFAULT 'transparent',
  	"abbreviate" boolean DEFAULT false,
  	"big_number_prefix" varchar,
  	"big_number" numeric,
  	"big_number_suffix" varchar,
  	"big_number_alignment" "enum_pages_blocks_metrics_bar_big_number_alignment" DEFAULT 'right',
  	"content_heading" varchar,
  	"content_text" varchar,
  	"content_image_id" integer,
  	"content_subtext" varchar,
  	"show_top_divider" boolean DEFAULT false,
  	"spacing_density" "enum_pages_blocks_metrics_bar_spacing_density" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_notice" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_notice_variant" DEFAULT 'info',
  	"use_custom_style" boolean DEFAULT false,
  	"custom_background_color" varchar,
  	"custom_icon" "enum_pages_blocks_notice_custom_icon",
  	"title" varchar,
  	"heading_alignment" "enum_pages_blocks_notice_heading_alignment" DEFAULT 'center',
  	"content" jsonb,
  	"dismissible" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_portfolio_cards_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"domain" varchar,
  	"url" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_portfolio_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"heading_alignment" "enum_pages_blocks_portfolio_cards_heading_alignment" DEFAULT 'left',
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_services_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"heading_alignment" "enum_pages_blocks_services_block_heading_alignment" DEFAULT 'center',
  	"subheading" varchar,
  	"layout" "enum_pages_blocks_services_block_layout" DEFAULT 'grid',
  	"show_borders" boolean DEFAULT false,
  	"show_descriptions" boolean DEFAULT true,
  	"show_links" boolean DEFAULT true,
  	"show_c_t_a" boolean DEFAULT true,
  	"cta_label" varchar,
  	"cta_url" varchar DEFAULT '/services',
  	"show_top_divider" boolean DEFAULT false,
  	"spacing_density" "enum_pages_blocks_services_block_spacing_density" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_split1x2" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"small_column_position" "enum_pages_blocks_split1x2_small_column_position" DEFAULT 'left',
  	"heading_alignment" "enum_pages_blocks_split1x2_heading_alignment" DEFAULT 'center',
  	"small_column_display_type" "enum_pages_blocks_split1x2_small_column_display_type" DEFAULT 'image',
  	"small_column_image_id" integer,
  	"small_column_rounded_corners" boolean DEFAULT false,
  	"small_column_title" varchar,
  	"small_column_subtitle" varchar,
  	"small_column_description" varchar,
  	"large_column_header" varchar,
  	"large_column_subheader" varchar,
  	"large_column_description" jsonb,
  	"background_color" "enum_pages_blocks_split1x2_background_color" DEFAULT 'white',
  	"show_top_divider" boolean DEFAULT false,
  	"spacing_density" "enum_pages_blocks_split1x2_spacing_density" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_split_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"heading_alignment" "enum_pages_blocks_split_section_heading_alignment" DEFAULT 'center',
  	"description" varchar,
  	"image_id" integer,
  	"image_position" "enum_pages_blocks_split_section_image_position" DEFAULT 'left',
  	"layout_style" "enum_pages_blocks_split_section_layout_style" DEFAULT 'standard',
  	"background_color" "enum_pages_blocks_split_section_background_color" DEFAULT 'white',
  	"primary_link_label" varchar,
  	"primary_link_type" "enum_pages_blocks_split_section_primary_link_type" DEFAULT 'internal',
  	"primary_link_external_url" varchar,
  	"primary_link_new_tab" boolean DEFAULT false,
  	"primary_link_anchor" varchar,
  	"primary_link_aria_label" varchar,
  	"primary_link_nofollow" boolean DEFAULT false,
  	"primary_link_noreferrer" boolean DEFAULT false,
  	"primary_link_sponsored" boolean DEFAULT false,
  	"primary_link_utm_source" varchar,
  	"primary_link_utm_medium" varchar,
  	"primary_link_utm_campaign" varchar,
  	"primary_link_utm_content" varchar,
  	"secondary_link_label" varchar,
  	"secondary_link_type" "enum_pages_blocks_split_section_secondary_link_type" DEFAULT 'internal',
  	"secondary_link_external_url" varchar,
  	"secondary_link_new_tab" boolean DEFAULT false,
  	"secondary_link_anchor" varchar,
  	"secondary_link_aria_label" varchar,
  	"secondary_link_nofollow" boolean DEFAULT false,
  	"secondary_link_noreferrer" boolean DEFAULT false,
  	"secondary_link_sponsored" boolean DEFAULT false,
  	"secondary_link_utm_source" varchar,
  	"secondary_link_utm_medium" varchar,
  	"secondary_link_utm_campaign" varchar,
  	"secondary_link_utm_content" varchar,
  	"show_top_divider" boolean DEFAULT false,
  	"spacing_density" "enum_pages_blocks_split_section_spacing_density" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_tabs_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tab_label" varchar,
  	"tab_content" jsonb,
  	"tab_icon" "enum_pages_blocks_tabs_tabs_tab_icon",
  	"tab_image_id" integer
  );
  
  CREATE TABLE "pages_blocks_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_heading" varchar,
  	"heading_alignment" "enum_pages_blocks_tabs_heading_alignment" DEFAULT 'center',
  	"tab_alignment" "enum_pages_blocks_tabs_tab_alignment" DEFAULT 'left',
  	"tab_style" "enum_pages_blocks_tabs_tab_style" DEFAULT 'underline',
  	"background" "enum_pages_blocks_tabs_background" DEFAULT 'transparent',
  	"show_top_divider" boolean DEFAULT false,
  	"spacing_density" "enum_pages_blocks_tabs_spacing_density" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_thesis_stats_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_thesis_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"heading_alignment" "enum_pages_blocks_thesis_stats_heading_alignment" DEFAULT 'left',
  	"body" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"search_excerpt" varchar,
  	"search_keywords" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"meta_og_title" varchar,
  	"meta_og_description" varchar,
  	"meta_og_image_id" integer,
  	"meta_no_index" boolean DEFAULT false,
  	"published_at" timestamp(3) with time zone,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"domains_id" integer,
  	"services_id" integer,
  	"videos_id" integer,
  	"portfolios_id" integer,
  	"articles_id" integer,
  	"categories_id" integer,
  	"domain_category_id" integer
  );
  
  CREATE TABLE "_pages_v_blocks_accordion_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" jsonb,
  	"category" varchar,
  	"default_open" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_heading" varchar,
  	"heading_alignment" "enum__pages_v_blocks_accordion_heading_alignment" DEFAULT 'center',
  	"section_subtitle" varchar,
  	"allow_multiple_open" boolean DEFAULT false,
  	"default_first_open" boolean DEFAULT false,
  	"background" "enum__pages_v_blocks_accordion_background" DEFAULT 'transparent',
  	"show_top_divider" boolean DEFAULT false,
  	"spacing_density" "enum__pages_v_blocks_accordion_spacing_density" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_action_card_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_type" "enum__pages_v_blocks_action_card_grid_cards_media_type" DEFAULT 'icon',
  	"icon" "enum__pages_v_blocks_action_card_grid_cards_icon",
  	"image_id" integer,
  	"title" varchar,
  	"description" varchar,
  	"link_label" varchar,
  	"link_type" "enum__pages_v_blocks_action_card_grid_cards_link_type" DEFAULT 'internal',
  	"link_external_url" varchar,
  	"link_new_tab" boolean DEFAULT false,
  	"link_anchor" varchar,
  	"link_aria_label" varchar,
  	"link_nofollow" boolean DEFAULT false,
  	"link_noreferrer" boolean DEFAULT false,
  	"link_sponsored" boolean DEFAULT false,
  	"link_utm_source" varchar,
  	"link_utm_medium" varchar,
  	"link_utm_campaign" varchar,
  	"link_utm_content" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_action_card_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_heading" varchar,
  	"heading_alignment" "enum__pages_v_blocks_action_card_grid_heading_alignment" DEFAULT 'center',
  	"section_subtitle" varchar,
  	"columns" "enum__pages_v_blocks_action_card_grid_columns" DEFAULT '3',
  	"card_style" "enum__pages_v_blocks_action_card_grid_card_style" DEFAULT 'bordered',
  	"section_alignment" "enum__pages_v_blocks_action_card_grid_section_alignment" DEFAULT 'center',
  	"card_alignment" "enum__pages_v_blocks_action_card_grid_card_alignment" DEFAULT 'center',
  	"section_background" "enum__pages_v_blocks_action_card_grid_section_background" DEFAULT 'transparent',
  	"show_top_divider" boolean DEFAULT false,
  	"spacing_density" "enum__pages_v_blocks_action_card_grid_spacing_density" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"intro_content" jsonb,
  	"populate_by" "enum__pages_v_blocks_archive_populate_by" DEFAULT 'collection',
  	"relation_to" "enum__pages_v_blocks_archive_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 10,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_label" varchar,
  	"link_type" "enum__pages_v_blocks_cta_links_link_type" DEFAULT 'internal',
  	"link_external_url" varchar,
  	"link_new_tab" boolean DEFAULT false,
  	"link_anchor" varchar,
  	"link_aria_label" varchar,
  	"link_nofollow" boolean DEFAULT false,
  	"link_noreferrer" boolean DEFAULT false,
  	"link_sponsored" boolean DEFAULT false,
  	"link_utm_source" varchar,
  	"link_utm_medium" varchar,
  	"link_utm_campaign" varchar,
  	"link_utm_content" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"background_color" "enum__pages_v_blocks_cta_background_color" DEFAULT 'lightGray',
  	"show_top_divider" boolean DEFAULT false,
  	"spacing_density" "enum__pages_v_blocks_cta_spacing_density" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_capabilities_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_capabilities_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"heading_alignment" "enum__pages_v_blocks_capabilities_grid_heading_alignment" DEFAULT 'left',
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_centered_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"heading_alignment" "enum__pages_v_blocks_centered_content_heading_alignment" DEFAULT 'center',
  	"subheading" varchar,
  	"content" jsonb,
  	"alignment" "enum__pages_v_blocks_centered_content_alignment" DEFAULT 'center',
  	"width" "enum__pages_v_blocks_centered_content_width" DEFAULT 'medium',
  	"background_color" "enum__pages_v_blocks_centered_content_background_color" DEFAULT 'white',
  	"primary_link_label" varchar,
  	"primary_link_type" "enum__pages_v_blocks_centered_content_primary_link_type" DEFAULT 'internal',
  	"primary_link_external_url" varchar,
  	"primary_link_new_tab" boolean DEFAULT false,
  	"primary_link_anchor" varchar,
  	"primary_link_aria_label" varchar,
  	"primary_link_nofollow" boolean DEFAULT false,
  	"primary_link_noreferrer" boolean DEFAULT false,
  	"primary_link_sponsored" boolean DEFAULT false,
  	"primary_link_utm_source" varchar,
  	"primary_link_utm_medium" varchar,
  	"primary_link_utm_campaign" varchar,
  	"primary_link_utm_content" varchar,
  	"secondary_link_label" varchar,
  	"secondary_link_type" "enum__pages_v_blocks_centered_content_secondary_link_type" DEFAULT 'internal',
  	"secondary_link_external_url" varchar,
  	"secondary_link_new_tab" boolean DEFAULT false,
  	"secondary_link_anchor" varchar,
  	"secondary_link_aria_label" varchar,
  	"secondary_link_nofollow" boolean DEFAULT false,
  	"secondary_link_noreferrer" boolean DEFAULT false,
  	"secondary_link_sponsored" boolean DEFAULT false,
  	"secondary_link_utm_source" varchar,
  	"secondary_link_utm_medium" varchar,
  	"secondary_link_utm_campaign" varchar,
  	"secondary_link_utm_content" varchar,
  	"show_top_divider" boolean DEFAULT false,
  	"spacing_density" "enum__pages_v_blocks_centered_content_spacing_density" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_client_logos_clients" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"logo_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_client_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"heading_alignment" "enum__pages_v_blocks_client_logos_heading_alignment" DEFAULT 'left',
  	"subtitle" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_company_facts_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_company_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"heading_alignment" "enum__pages_v_blocks_company_facts_heading_alignment" DEFAULT 'center',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_info" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"company_name" varchar,
  	"heading_alignment" "enum__pages_v_blocks_contact_info_heading_alignment" DEFAULT 'left',
  	"description" varchar,
  	"address" varchar,
  	"phone" varchar,
  	"email_note" varchar,
  	"hours" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_code" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"language" "enum__pages_v_blocks_code_language" DEFAULT 'typescript',
  	"code" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" "enum__pages_v_blocks_content_columns_size" DEFAULT 'oneThird',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_label" varchar,
  	"link_type" "enum__pages_v_blocks_content_columns_link_type" DEFAULT 'internal',
  	"link_external_url" varchar,
  	"link_new_tab" boolean DEFAULT false,
  	"link_anchor" varchar,
  	"link_aria_label" varchar,
  	"link_nofollow" boolean DEFAULT false,
  	"link_noreferrer" boolean DEFAULT false,
  	"link_sponsored" boolean DEFAULT false,
  	"link_utm_source" varchar,
  	"link_utm_medium" varchar,
  	"link_utm_campaign" varchar,
  	"link_utm_content" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_color" "enum__pages_v_blocks_content_background_color" DEFAULT 'white',
  	"show_top_divider" boolean DEFAULT false,
  	"spacing_density" "enum__pages_v_blocks_content_spacing_density" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_domain_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"source_mode" "enum__pages_v_blocks_domain_showcase_source_mode" DEFAULT 'featured',
  	"limit" numeric DEFAULT 6,
  	"title" varchar,
  	"heading_alignment" "enum__pages_v_blocks_domain_showcase_heading_alignment" DEFAULT 'center',
  	"subtitle" varchar,
  	"show_view_all" boolean DEFAULT true,
  	"background_color" "enum__pages_v_blocks_domain_showcase_background_color" DEFAULT 'white',
  	"show_top_divider" boolean DEFAULT false,
  	"spacing_density" "enum__pages_v_blocks_domain_showcase_spacing_density" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_carousel_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"title" varchar,
  	"description" varchar,
  	"primary_link_label" varchar,
  	"primary_link_type" "enum_sl_pri_link_type" DEFAULT 'internal',
  	"primary_link_external_url" varchar,
  	"primary_link_new_tab" boolean DEFAULT false,
  	"primary_link_anchor" varchar,
  	"primary_link_aria_label" varchar,
  	"primary_link_nofollow" boolean DEFAULT false,
  	"primary_link_noreferrer" boolean DEFAULT false,
  	"primary_link_sponsored" boolean DEFAULT false,
  	"primary_link_utm_source" varchar,
  	"primary_link_utm_medium" varchar,
  	"primary_link_utm_campaign" varchar,
  	"primary_link_utm_content" varchar,
  	"secondary_link_label" varchar,
  	"secondary_link_type" "enum_sl_sec_link_type" DEFAULT 'internal',
  	"secondary_link_external_url" varchar,
  	"secondary_link_new_tab" boolean DEFAULT false,
  	"secondary_link_anchor" varchar,
  	"secondary_link_aria_label" varchar,
  	"secondary_link_nofollow" boolean DEFAULT false,
  	"secondary_link_noreferrer" boolean DEFAULT false,
  	"secondary_link_sponsored" boolean DEFAULT false,
  	"secondary_link_utm_source" varchar,
  	"secondary_link_utm_medium" varchar,
  	"secondary_link_utm_campaign" varchar,
  	"secondary_link_utm_content" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"use_shared_content" boolean DEFAULT false,
  	"text_alignment" "enum__pages_v_blocks_hero_carousel_text_alignment" DEFAULT 'left',
  	"shared_content_title" varchar,
  	"shared_content_description" varchar,
  	"shared_content_primary_link_label" varchar,
  	"shared_content_primary_link_type" "enum_sc_pri_link_type" DEFAULT 'internal',
  	"shared_content_primary_link_external_url" varchar,
  	"shared_content_primary_link_new_tab" boolean DEFAULT false,
  	"shared_content_primary_link_anchor" varchar,
  	"shared_content_primary_link_aria_label" varchar,
  	"shared_content_primary_link_nofollow" boolean DEFAULT false,
  	"shared_content_primary_link_noreferrer" boolean DEFAULT false,
  	"shared_content_primary_link_sponsored" boolean DEFAULT false,
  	"shared_content_primary_link_utm_source" varchar,
  	"shared_content_primary_link_utm_medium" varchar,
  	"shared_content_primary_link_utm_campaign" varchar,
  	"shared_content_primary_link_utm_content" varchar,
  	"shared_content_secondary_link_label" varchar,
  	"shared_content_secondary_link_type" "enum_sc_sec_link_type" DEFAULT 'internal',
  	"shared_content_secondary_link_external_url" varchar,
  	"shared_content_secondary_link_new_tab" boolean DEFAULT false,
  	"shared_content_secondary_link_anchor" varchar,
  	"shared_content_secondary_link_aria_label" varchar,
  	"shared_content_secondary_link_nofollow" boolean DEFAULT false,
  	"shared_content_secondary_link_noreferrer" boolean DEFAULT false,
  	"shared_content_secondary_link_sponsored" boolean DEFAULT false,
  	"shared_content_secondary_link_utm_source" varchar,
  	"shared_content_secondary_link_utm_medium" varchar,
  	"shared_content_secondary_link_utm_campaign" varchar,
  	"shared_content_secondary_link_utm_content" varchar,
  	"height" "enum__pages_v_blocks_hero_carousel_height" DEFAULT 'standard',
  	"show_arrows" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_header_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"heading" varchar,
  	"subtitle" varchar,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_header" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" "enum__pages_v_blocks_hero_header_size" DEFAULT 'medium',
  	"title" varchar,
  	"subtitle" varchar,
  	"image_id" integer,
  	"heading_alignment" "enum__pages_v_blocks_hero_header_heading_alignment" DEFAULT 'left',
  	"primary_link_label" varchar,
  	"primary_link_type" "enum_hh_pri_link_type" DEFAULT 'internal',
  	"primary_link_external_url" varchar,
  	"primary_link_new_tab" boolean DEFAULT false,
  	"primary_link_anchor" varchar,
  	"primary_link_aria_label" varchar,
  	"primary_link_nofollow" boolean DEFAULT false,
  	"primary_link_noreferrer" boolean DEFAULT false,
  	"primary_link_sponsored" boolean DEFAULT false,
  	"primary_link_utm_source" varchar,
  	"primary_link_utm_medium" varchar,
  	"primary_link_utm_campaign" varchar,
  	"primary_link_utm_content" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_image_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_image_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_heading" varchar,
  	"heading_alignment" "enum__pages_v_blocks_image_gallery_heading_alignment" DEFAULT 'center',
  	"columns" "enum__pages_v_blocks_image_gallery_columns" DEFAULT '3',
  	"aspect_ratio" "enum__pages_v_blocks_image_gallery_aspect_ratio" DEFAULT '16:9',
  	"gap" "enum__pages_v_blocks_image_gallery_gap" DEFAULT 'normal',
  	"caption_alignment" "enum__pages_v_blocks_image_gallery_caption_alignment" DEFAULT 'left',
  	"lightbox" boolean DEFAULT false,
  	"background_color" "enum__pages_v_blocks_image_gallery_background_color" DEFAULT 'white',
  	"show_top_divider" boolean DEFAULT false,
  	"spacing_density" "enum__pages_v_blocks_image_gallery_spacing_density" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_metrics_bar_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"prefix" varchar,
  	"number" numeric,
  	"suffix" varchar,
  	"label" varchar,
  	"icon" "enum__pages_v_blocks_metrics_bar_items_icon",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_metrics_bar" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"mode" "enum__pages_v_blocks_metrics_bar_mode" DEFAULT 'bar',
  	"section_heading" varchar,
  	"heading_alignment" "enum__pages_v_blocks_metrics_bar_heading_alignment" DEFAULT 'center',
  	"background" "enum__pages_v_blocks_metrics_bar_background" DEFAULT 'transparent',
  	"abbreviate" boolean DEFAULT false,
  	"big_number_prefix" varchar,
  	"big_number" numeric,
  	"big_number_suffix" varchar,
  	"big_number_alignment" "enum__pages_v_blocks_metrics_bar_big_number_alignment" DEFAULT 'right',
  	"content_heading" varchar,
  	"content_text" varchar,
  	"content_image_id" integer,
  	"content_subtext" varchar,
  	"show_top_divider" boolean DEFAULT false,
  	"spacing_density" "enum__pages_v_blocks_metrics_bar_spacing_density" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_notice" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_notice_variant" DEFAULT 'info',
  	"use_custom_style" boolean DEFAULT false,
  	"custom_background_color" varchar,
  	"custom_icon" "enum__pages_v_blocks_notice_custom_icon",
  	"title" varchar,
  	"heading_alignment" "enum__pages_v_blocks_notice_heading_alignment" DEFAULT 'center',
  	"content" jsonb,
  	"dismissible" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_portfolio_cards_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"domain" varchar,
  	"url" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_portfolio_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"heading_alignment" "enum__pages_v_blocks_portfolio_cards_heading_alignment" DEFAULT 'left',
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_services_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"heading_alignment" "enum__pages_v_blocks_services_block_heading_alignment" DEFAULT 'center',
  	"subheading" varchar,
  	"layout" "enum__pages_v_blocks_services_block_layout" DEFAULT 'grid',
  	"show_borders" boolean DEFAULT false,
  	"show_descriptions" boolean DEFAULT true,
  	"show_links" boolean DEFAULT true,
  	"show_c_t_a" boolean DEFAULT true,
  	"cta_label" varchar,
  	"cta_url" varchar DEFAULT '/services',
  	"show_top_divider" boolean DEFAULT false,
  	"spacing_density" "enum__pages_v_blocks_services_block_spacing_density" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_split1x2" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"small_column_position" "enum__pages_v_blocks_split1x2_small_column_position" DEFAULT 'left',
  	"heading_alignment" "enum__pages_v_blocks_split1x2_heading_alignment" DEFAULT 'center',
  	"small_column_display_type" "enum__pages_v_blocks_split1x2_small_column_display_type" DEFAULT 'image',
  	"small_column_image_id" integer,
  	"small_column_rounded_corners" boolean DEFAULT false,
  	"small_column_title" varchar,
  	"small_column_subtitle" varchar,
  	"small_column_description" varchar,
  	"large_column_header" varchar,
  	"large_column_subheader" varchar,
  	"large_column_description" jsonb,
  	"background_color" "enum__pages_v_blocks_split1x2_background_color" DEFAULT 'white',
  	"show_top_divider" boolean DEFAULT false,
  	"spacing_density" "enum__pages_v_blocks_split1x2_spacing_density" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_split_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"heading_alignment" "enum__pages_v_blocks_split_section_heading_alignment" DEFAULT 'center',
  	"description" varchar,
  	"image_id" integer,
  	"image_position" "enum__pages_v_blocks_split_section_image_position" DEFAULT 'left',
  	"layout_style" "enum__pages_v_blocks_split_section_layout_style" DEFAULT 'standard',
  	"background_color" "enum__pages_v_blocks_split_section_background_color" DEFAULT 'white',
  	"primary_link_label" varchar,
  	"primary_link_type" "enum__pages_v_blocks_split_section_primary_link_type" DEFAULT 'internal',
  	"primary_link_external_url" varchar,
  	"primary_link_new_tab" boolean DEFAULT false,
  	"primary_link_anchor" varchar,
  	"primary_link_aria_label" varchar,
  	"primary_link_nofollow" boolean DEFAULT false,
  	"primary_link_noreferrer" boolean DEFAULT false,
  	"primary_link_sponsored" boolean DEFAULT false,
  	"primary_link_utm_source" varchar,
  	"primary_link_utm_medium" varchar,
  	"primary_link_utm_campaign" varchar,
  	"primary_link_utm_content" varchar,
  	"secondary_link_label" varchar,
  	"secondary_link_type" "enum__pages_v_blocks_split_section_secondary_link_type" DEFAULT 'internal',
  	"secondary_link_external_url" varchar,
  	"secondary_link_new_tab" boolean DEFAULT false,
  	"secondary_link_anchor" varchar,
  	"secondary_link_aria_label" varchar,
  	"secondary_link_nofollow" boolean DEFAULT false,
  	"secondary_link_noreferrer" boolean DEFAULT false,
  	"secondary_link_sponsored" boolean DEFAULT false,
  	"secondary_link_utm_source" varchar,
  	"secondary_link_utm_medium" varchar,
  	"secondary_link_utm_campaign" varchar,
  	"secondary_link_utm_content" varchar,
  	"show_top_divider" boolean DEFAULT false,
  	"spacing_density" "enum__pages_v_blocks_split_section_spacing_density" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_tabs_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tab_label" varchar,
  	"tab_content" jsonb,
  	"tab_icon" "enum__pages_v_blocks_tabs_tabs_tab_icon",
  	"tab_image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_heading" varchar,
  	"heading_alignment" "enum__pages_v_blocks_tabs_heading_alignment" DEFAULT 'center',
  	"tab_alignment" "enum__pages_v_blocks_tabs_tab_alignment" DEFAULT 'left',
  	"tab_style" "enum__pages_v_blocks_tabs_tab_style" DEFAULT 'underline',
  	"background" "enum__pages_v_blocks_tabs_background" DEFAULT 'transparent',
  	"show_top_divider" boolean DEFAULT false,
  	"spacing_density" "enum__pages_v_blocks_tabs_spacing_density" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_thesis_stats_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_thesis_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"heading_alignment" "enum__pages_v_blocks_thesis_stats_heading_alignment" DEFAULT 'left',
  	"body" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_search_excerpt" varchar,
  	"version_search_keywords" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_og_title" varchar,
  	"version_meta_og_description" varchar,
  	"version_meta_og_image_id" integer,
  	"version_meta_no_index" boolean DEFAULT false,
  	"version_published_at" timestamp(3) with time zone,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"domains_id" integer,
  	"services_id" integer,
  	"videos_id" integer,
  	"portfolios_id" integer,
  	"articles_id" integer,
  	"categories_id" integer,
  	"domain_category_id" integer
  );
  
  CREATE TABLE "posts_takeaways" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "posts_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar
  );
  
  CREATE TABLE "posts_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"hero_image_id" integer,
  	"takeaway_heading" varchar,
  	"content" jsonb,
  	"search_excerpt" varchar,
  	"search_keywords" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"meta_og_title" varchar,
  	"meta_og_description" varchar,
  	"meta_og_image_id" integer,
  	"meta_no_index" boolean DEFAULT false,
  	"reading_time" numeric,
  	"published_at" timestamp(3) with time zone,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "posts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer,
  	"categories_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "_posts_v_version_takeaways" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_version_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_version_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"name" varchar
  );
  
  CREATE TABLE "_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_hero_image_id" integer,
  	"version_takeaway_heading" varchar,
  	"version_content" jsonb,
  	"version_search_excerpt" varchar,
  	"version_search_keywords" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_og_title" varchar,
  	"version_meta_og_description" varchar,
  	"version_meta_og_image_id" integer,
  	"version_meta_no_index" boolean DEFAULT false,
  	"version_reading_time" numeric,
  	"version_published_at" timestamp(3) with time zone,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_posts_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer,
  	"categories_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "domains_rich_summary_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"bullet" varchar
  );
  
  CREATE TABLE "domains_use_cases" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"use_case" varchar
  );
  
  CREATE TABLE "domains" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"domain_name" varchar,
  	"featured_image_id" integer,
  	"description" varchar,
  	"rich_summary_title" varchar DEFAULT 'このドメインについて',
  	"rich_summary_intro" jsonb,
  	"use_cases_title" varchar DEFAULT 'このドメインの活用シーン',
  	"use_cases_summary" jsonb,
  	"category_id" integer,
  	"domain_a_s_c_i_i" varchar,
  	"domain_unicode" varchar,
  	"extension" varchar,
  	"domain_script" "enum_domains_domain_script" DEFAULT 'latin',
  	"status" "enum_domains_status" DEFAULT 'open',
  	"minimum_offer" numeric,
  	"registration_date" timestamp(3) with time zone,
  	"featured" boolean DEFAULT false,
  	"search_excerpt" varchar,
  	"search_keywords" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"meta_og_title" varchar,
  	"meta_og_description" varchar,
  	"meta_og_image_id" integer,
  	"meta_no_index" boolean DEFAULT false,
  	"published_at" timestamp(3) with time zone,
  	"slug_override" varchar,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_domains_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_domains_v_version_rich_summary_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"bullet" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_domains_v_version_use_cases" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"use_case" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_domains_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_domain_name" varchar,
  	"version_featured_image_id" integer,
  	"version_description" varchar,
  	"version_rich_summary_title" varchar DEFAULT 'このドメインについて',
  	"version_rich_summary_intro" jsonb,
  	"version_use_cases_title" varchar DEFAULT 'このドメインの活用シーン',
  	"version_use_cases_summary" jsonb,
  	"version_category_id" integer,
  	"version_domain_a_s_c_i_i" varchar,
  	"version_domain_unicode" varchar,
  	"version_extension" varchar,
  	"version_domain_script" "enum__domains_v_version_domain_script" DEFAULT 'latin',
  	"version_status" "enum__domains_v_version_status" DEFAULT 'open',
  	"version_minimum_offer" numeric,
  	"version_registration_date" timestamp(3) with time zone,
  	"version_featured" boolean DEFAULT false,
  	"version_search_excerpt" varchar,
  	"version_search_keywords" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_og_title" varchar,
  	"version_meta_og_description" varchar,
  	"version_meta_og_image_id" integer,
  	"version_meta_no_index" boolean DEFAULT false,
  	"version_published_at" timestamp(3) with time zone,
  	"version_slug_override" varchar,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__domains_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "domain_sets" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"policy" "enum_domain_sets_policy" DEFAULT 'allow_individual' NOT NULL,
  	"description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "domain_sets_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"domains_id" integer
  );
  
  CREATE TABLE "domain_inquiries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"domain_id" integer NOT NULL,
  	"domain_name" varchar,
  	"offer" varchar,
  	"budget" "enum_domain_inquiries_budget",
  	"message" varchar NOT NULL,
  	"website" varchar,
  	"status" "enum_domain_inquiries_status" DEFAULT 'new' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "domain_category" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"icon" "enum_domain_category_icon",
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"caption" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_square_url" varchar,
  	"sizes_square_width" numeric,
  	"sizes_square_height" numeric,
  	"sizes_square_mime_type" varchar,
  	"sizes_square_filesize" numeric,
  	"sizes_square_filename" varchar,
  	"sizes_small_url" varchar,
  	"sizes_small_width" numeric,
  	"sizes_small_height" numeric,
  	"sizes_small_mime_type" varchar,
  	"sizes_small_filesize" numeric,
  	"sizes_small_filename" varchar,
  	"sizes_medium_url" varchar,
  	"sizes_medium_width" numeric,
  	"sizes_medium_height" numeric,
  	"sizes_medium_mime_type" varchar,
  	"sizes_medium_filesize" numeric,
  	"sizes_medium_filename" varchar,
  	"sizes_large_url" varchar,
  	"sizes_large_width" numeric,
  	"sizes_large_height" numeric,
  	"sizes_large_mime_type" varchar,
  	"sizes_large_filesize" numeric,
  	"sizes_large_filename" varchar,
  	"sizes_xlarge_url" varchar,
  	"sizes_xlarge_width" numeric,
  	"sizes_xlarge_height" numeric,
  	"sizes_xlarge_mime_type" varchar,
  	"sizes_xlarge_filesize" numeric,
  	"sizes_xlarge_filename" varchar,
  	"sizes_og_url" varchar,
  	"sizes_og_width" numeric,
  	"sizes_og_height" numeric,
  	"sizes_og_mime_type" varchar,
  	"sizes_og_filesize" numeric,
  	"sizes_og_filename" varchar
  );
  
  CREATE TABLE "categories_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"doc_id" integer,
  	"url" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"parent_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "services_deliverables" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "services_authority_section_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "services_blocks_accordion_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"content" jsonb NOT NULL,
  	"category" varchar,
  	"default_open" boolean DEFAULT false
  );
  
  CREATE TABLE "services_blocks_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_heading" varchar,
  	"heading_alignment" "enum_services_blocks_accordion_heading_alignment" DEFAULT 'center',
  	"section_subtitle" varchar,
  	"allow_multiple_open" boolean DEFAULT false,
  	"default_first_open" boolean DEFAULT false,
  	"background" "enum_services_blocks_accordion_background" DEFAULT 'transparent',
  	"show_top_divider" boolean DEFAULT false,
  	"spacing_density" "enum_services_blocks_accordion_spacing_density" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_action_card_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_type" "enum_services_blocks_action_card_grid_cards_media_type" DEFAULT 'icon' NOT NULL,
  	"icon" "enum_services_blocks_action_card_grid_cards_icon",
  	"image_id" integer,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"link_label" varchar NOT NULL,
  	"link_type" "enum_services_blocks_action_card_grid_cards_link_type" DEFAULT 'internal',
  	"link_external_url" varchar,
  	"link_new_tab" boolean DEFAULT false,
  	"link_anchor" varchar,
  	"link_aria_label" varchar,
  	"link_nofollow" boolean DEFAULT false,
  	"link_noreferrer" boolean DEFAULT false,
  	"link_sponsored" boolean DEFAULT false,
  	"link_utm_source" varchar,
  	"link_utm_medium" varchar,
  	"link_utm_campaign" varchar,
  	"link_utm_content" varchar
  );
  
  CREATE TABLE "services_blocks_action_card_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_heading" varchar,
  	"heading_alignment" "enum_services_blocks_action_card_grid_heading_alignment" DEFAULT 'center',
  	"section_subtitle" varchar,
  	"columns" "enum_services_blocks_action_card_grid_columns" DEFAULT '3' NOT NULL,
  	"card_style" "enum_services_blocks_action_card_grid_card_style" DEFAULT 'bordered' NOT NULL,
  	"section_alignment" "enum_services_blocks_action_card_grid_section_alignment" DEFAULT 'center',
  	"card_alignment" "enum_services_blocks_action_card_grid_card_alignment" DEFAULT 'center',
  	"section_background" "enum_services_blocks_action_card_grid_section_background" DEFAULT 'transparent',
  	"show_top_divider" boolean DEFAULT false,
  	"spacing_density" "enum_services_blocks_action_card_grid_spacing_density" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_label" varchar NOT NULL,
  	"link_type" "enum_services_blocks_cta_links_link_type" DEFAULT 'internal',
  	"link_external_url" varchar,
  	"link_new_tab" boolean DEFAULT false,
  	"link_anchor" varchar,
  	"link_aria_label" varchar,
  	"link_nofollow" boolean DEFAULT false,
  	"link_noreferrer" boolean DEFAULT false,
  	"link_sponsored" boolean DEFAULT false,
  	"link_utm_source" varchar,
  	"link_utm_medium" varchar,
  	"link_utm_campaign" varchar,
  	"link_utm_content" varchar
  );
  
  CREATE TABLE "services_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"background_color" "enum_services_blocks_cta_background_color" DEFAULT 'lightGray',
  	"show_top_divider" boolean DEFAULT false,
  	"spacing_density" "enum_services_blocks_cta_spacing_density" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_centered_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"heading_alignment" "enum_services_blocks_centered_content_heading_alignment" DEFAULT 'center',
  	"subheading" varchar,
  	"content" jsonb,
  	"alignment" "enum_services_blocks_centered_content_alignment" DEFAULT 'center',
  	"width" "enum_services_blocks_centered_content_width" DEFAULT 'medium',
  	"background_color" "enum_services_blocks_centered_content_background_color" DEFAULT 'white',
  	"primary_link_label" varchar,
  	"primary_link_type" "enum_services_blocks_centered_content_primary_link_type" DEFAULT 'internal',
  	"primary_link_external_url" varchar,
  	"primary_link_new_tab" boolean DEFAULT false,
  	"primary_link_anchor" varchar,
  	"primary_link_aria_label" varchar,
  	"primary_link_nofollow" boolean DEFAULT false,
  	"primary_link_noreferrer" boolean DEFAULT false,
  	"primary_link_sponsored" boolean DEFAULT false,
  	"primary_link_utm_source" varchar,
  	"primary_link_utm_medium" varchar,
  	"primary_link_utm_campaign" varchar,
  	"primary_link_utm_content" varchar,
  	"secondary_link_label" varchar,
  	"secondary_link_type" "enum_services_blocks_centered_content_secondary_link_type" DEFAULT 'internal',
  	"secondary_link_external_url" varchar,
  	"secondary_link_new_tab" boolean DEFAULT false,
  	"secondary_link_anchor" varchar,
  	"secondary_link_aria_label" varchar,
  	"secondary_link_nofollow" boolean DEFAULT false,
  	"secondary_link_noreferrer" boolean DEFAULT false,
  	"secondary_link_sponsored" boolean DEFAULT false,
  	"secondary_link_utm_source" varchar,
  	"secondary_link_utm_medium" varchar,
  	"secondary_link_utm_campaign" varchar,
  	"secondary_link_utm_content" varchar,
  	"show_top_divider" boolean DEFAULT false,
  	"spacing_density" "enum_services_blocks_centered_content_spacing_density" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_services_blocks_content_columns_size" DEFAULT 'oneThird',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_label" varchar,
  	"link_type" "enum_services_blocks_content_columns_link_type" DEFAULT 'internal',
  	"link_external_url" varchar,
  	"link_new_tab" boolean DEFAULT false,
  	"link_anchor" varchar,
  	"link_aria_label" varchar,
  	"link_nofollow" boolean DEFAULT false,
  	"link_noreferrer" boolean DEFAULT false,
  	"link_sponsored" boolean DEFAULT false,
  	"link_utm_source" varchar,
  	"link_utm_medium" varchar,
  	"link_utm_campaign" varchar,
  	"link_utm_content" varchar
  );
  
  CREATE TABLE "services_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_color" "enum_services_blocks_content_background_color" DEFAULT 'white',
  	"show_top_divider" boolean DEFAULT false,
  	"spacing_density" "enum_services_blocks_content_spacing_density" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_hero_carousel_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"primary_link_label" varchar,
  	"primary_link_type" "enum_sl_pri_link_type" DEFAULT 'internal',
  	"primary_link_external_url" varchar,
  	"primary_link_new_tab" boolean DEFAULT false,
  	"primary_link_anchor" varchar,
  	"primary_link_aria_label" varchar,
  	"primary_link_nofollow" boolean DEFAULT false,
  	"primary_link_noreferrer" boolean DEFAULT false,
  	"primary_link_sponsored" boolean DEFAULT false,
  	"primary_link_utm_source" varchar,
  	"primary_link_utm_medium" varchar,
  	"primary_link_utm_campaign" varchar,
  	"primary_link_utm_content" varchar,
  	"secondary_link_label" varchar,
  	"secondary_link_type" "enum_sl_sec_link_type" DEFAULT 'internal',
  	"secondary_link_external_url" varchar,
  	"secondary_link_new_tab" boolean DEFAULT false,
  	"secondary_link_anchor" varchar,
  	"secondary_link_aria_label" varchar,
  	"secondary_link_nofollow" boolean DEFAULT false,
  	"secondary_link_noreferrer" boolean DEFAULT false,
  	"secondary_link_sponsored" boolean DEFAULT false,
  	"secondary_link_utm_source" varchar,
  	"secondary_link_utm_medium" varchar,
  	"secondary_link_utm_campaign" varchar,
  	"secondary_link_utm_content" varchar
  );
  
  CREATE TABLE "services_blocks_hero_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"use_shared_content" boolean DEFAULT false,
  	"text_alignment" "enum_services_blocks_hero_carousel_text_alignment" DEFAULT 'left',
  	"shared_content_title" varchar,
  	"shared_content_description" varchar,
  	"shared_content_primary_link_label" varchar,
  	"shared_content_primary_link_type" "enum_sc_pri_link_type" DEFAULT 'internal',
  	"shared_content_primary_link_external_url" varchar,
  	"shared_content_primary_link_new_tab" boolean DEFAULT false,
  	"shared_content_primary_link_anchor" varchar,
  	"shared_content_primary_link_aria_label" varchar,
  	"shared_content_primary_link_nofollow" boolean DEFAULT false,
  	"shared_content_primary_link_noreferrer" boolean DEFAULT false,
  	"shared_content_primary_link_sponsored" boolean DEFAULT false,
  	"shared_content_primary_link_utm_source" varchar,
  	"shared_content_primary_link_utm_medium" varchar,
  	"shared_content_primary_link_utm_campaign" varchar,
  	"shared_content_primary_link_utm_content" varchar,
  	"shared_content_secondary_link_label" varchar,
  	"shared_content_secondary_link_type" "enum_sc_sec_link_type" DEFAULT 'internal',
  	"shared_content_secondary_link_external_url" varchar,
  	"shared_content_secondary_link_new_tab" boolean DEFAULT false,
  	"shared_content_secondary_link_anchor" varchar,
  	"shared_content_secondary_link_aria_label" varchar,
  	"shared_content_secondary_link_nofollow" boolean DEFAULT false,
  	"shared_content_secondary_link_noreferrer" boolean DEFAULT false,
  	"shared_content_secondary_link_sponsored" boolean DEFAULT false,
  	"shared_content_secondary_link_utm_source" varchar,
  	"shared_content_secondary_link_utm_medium" varchar,
  	"shared_content_secondary_link_utm_campaign" varchar,
  	"shared_content_secondary_link_utm_content" varchar,
  	"height" "enum_services_blocks_hero_carousel_height" DEFAULT 'standard',
  	"show_arrows" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_image_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"caption" varchar
  );
  
  CREATE TABLE "services_blocks_image_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_heading" varchar,
  	"heading_alignment" "enum_services_blocks_image_gallery_heading_alignment" DEFAULT 'center',
  	"columns" "enum_services_blocks_image_gallery_columns" DEFAULT '3' NOT NULL,
  	"aspect_ratio" "enum_services_blocks_image_gallery_aspect_ratio" DEFAULT '16:9' NOT NULL,
  	"gap" "enum_services_blocks_image_gallery_gap" DEFAULT 'normal',
  	"caption_alignment" "enum_services_blocks_image_gallery_caption_alignment" DEFAULT 'left',
  	"lightbox" boolean DEFAULT false,
  	"background_color" "enum_services_blocks_image_gallery_background_color" DEFAULT 'white',
  	"show_top_divider" boolean DEFAULT false,
  	"spacing_density" "enum_services_blocks_image_gallery_spacing_density" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_metrics_bar_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"prefix" varchar,
  	"number" numeric,
  	"suffix" varchar,
  	"label" varchar,
  	"icon" "enum_services_blocks_metrics_bar_items_icon"
  );
  
  CREATE TABLE "services_blocks_metrics_bar" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"mode" "enum_services_blocks_metrics_bar_mode" DEFAULT 'bar' NOT NULL,
  	"section_heading" varchar,
  	"heading_alignment" "enum_services_blocks_metrics_bar_heading_alignment" DEFAULT 'center',
  	"background" "enum_services_blocks_metrics_bar_background" DEFAULT 'transparent',
  	"abbreviate" boolean DEFAULT false,
  	"big_number_prefix" varchar,
  	"big_number" numeric,
  	"big_number_suffix" varchar,
  	"big_number_alignment" "enum_services_blocks_metrics_bar_big_number_alignment" DEFAULT 'right',
  	"content_heading" varchar,
  	"content_text" varchar,
  	"content_image_id" integer,
  	"content_subtext" varchar,
  	"show_top_divider" boolean DEFAULT false,
  	"spacing_density" "enum_services_blocks_metrics_bar_spacing_density" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_notice" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_services_blocks_notice_variant" DEFAULT 'info' NOT NULL,
  	"use_custom_style" boolean DEFAULT false,
  	"custom_background_color" varchar,
  	"custom_icon" "enum_services_blocks_notice_custom_icon",
  	"title" varchar,
  	"heading_alignment" "enum_services_blocks_notice_heading_alignment" DEFAULT 'center',
  	"content" jsonb NOT NULL,
  	"dismissible" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_split1x2" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"small_column_position" "enum_services_blocks_split1x2_small_column_position" DEFAULT 'left',
  	"heading_alignment" "enum_services_blocks_split1x2_heading_alignment" DEFAULT 'center',
  	"small_column_display_type" "enum_services_blocks_split1x2_small_column_display_type" DEFAULT 'image',
  	"small_column_image_id" integer,
  	"small_column_rounded_corners" boolean DEFAULT false,
  	"small_column_title" varchar,
  	"small_column_subtitle" varchar,
  	"small_column_description" varchar,
  	"large_column_header" varchar NOT NULL,
  	"large_column_subheader" varchar,
  	"large_column_description" jsonb NOT NULL,
  	"background_color" "enum_services_blocks_split1x2_background_color" DEFAULT 'white',
  	"show_top_divider" boolean DEFAULT false,
  	"spacing_density" "enum_services_blocks_split1x2_spacing_density" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_split_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"heading_alignment" "enum_services_blocks_split_section_heading_alignment" DEFAULT 'center',
  	"description" varchar NOT NULL,
  	"image_id" integer NOT NULL,
  	"image_position" "enum_services_blocks_split_section_image_position" DEFAULT 'left',
  	"layout_style" "enum_services_blocks_split_section_layout_style" DEFAULT 'standard',
  	"background_color" "enum_services_blocks_split_section_background_color" DEFAULT 'white',
  	"primary_link_label" varchar,
  	"primary_link_type" "enum_services_blocks_split_section_primary_link_type" DEFAULT 'internal',
  	"primary_link_external_url" varchar,
  	"primary_link_new_tab" boolean DEFAULT false,
  	"primary_link_anchor" varchar,
  	"primary_link_aria_label" varchar,
  	"primary_link_nofollow" boolean DEFAULT false,
  	"primary_link_noreferrer" boolean DEFAULT false,
  	"primary_link_sponsored" boolean DEFAULT false,
  	"primary_link_utm_source" varchar,
  	"primary_link_utm_medium" varchar,
  	"primary_link_utm_campaign" varchar,
  	"primary_link_utm_content" varchar,
  	"secondary_link_label" varchar,
  	"secondary_link_type" "enum_services_blocks_split_section_secondary_link_type" DEFAULT 'internal',
  	"secondary_link_external_url" varchar,
  	"secondary_link_new_tab" boolean DEFAULT false,
  	"secondary_link_anchor" varchar,
  	"secondary_link_aria_label" varchar,
  	"secondary_link_nofollow" boolean DEFAULT false,
  	"secondary_link_noreferrer" boolean DEFAULT false,
  	"secondary_link_sponsored" boolean DEFAULT false,
  	"secondary_link_utm_source" varchar,
  	"secondary_link_utm_medium" varchar,
  	"secondary_link_utm_campaign" varchar,
  	"secondary_link_utm_content" varchar,
  	"show_top_divider" boolean DEFAULT false,
  	"spacing_density" "enum_services_blocks_split_section_spacing_density" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "services_blocks_tabs_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tab_label" varchar NOT NULL,
  	"tab_content" jsonb NOT NULL,
  	"tab_icon" "enum_services_blocks_tabs_tabs_tab_icon",
  	"tab_image_id" integer
  );
  
  CREATE TABLE "services_blocks_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_heading" varchar,
  	"heading_alignment" "enum_services_blocks_tabs_heading_alignment" DEFAULT 'center',
  	"tab_alignment" "enum_services_blocks_tabs_tab_alignment" DEFAULT 'left',
  	"tab_style" "enum_services_blocks_tabs_tab_style" DEFAULT 'underline',
  	"background" "enum_services_blocks_tabs_background" DEFAULT 'transparent',
  	"show_top_divider" boolean DEFAULT false,
  	"spacing_density" "enum_services_blocks_tabs_spacing_density" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"sort_order" numeric DEFAULT 0,
  	"slug" varchar NOT NULL,
  	"description" jsonb,
  	"icon" "enum_services_icon" NOT NULL,
  	"category_id" integer,
  	"link_text" varchar DEFAULT '詳しく見る',
  	"link_url" varchar,
  	"featured_image_id" integer,
  	"listing_description" varchar,
  	"authority_section_heading" varchar,
  	"authority_section_body" varchar,
  	"cta_heading" varchar,
  	"cta_text" varchar,
  	"search_excerpt" varchar,
  	"search_keywords" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"meta_og_title" varchar,
  	"meta_og_description" varchar,
  	"meta_og_image_id" integer,
  	"meta_no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "services_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"domains_id" integer,
  	"services_id" integer,
  	"videos_id" integer,
  	"portfolios_id" integer,
  	"articles_id" integer
  );
  
  CREATE TABLE "service_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar,
  	"color" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "videos_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar
  );
  
  CREATE TABLE "videos" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"description" varchar,
  	"video_url" varchar,
  	"embed_code" varchar,
  	"duration" varchar,
  	"thumbnail_id" integer,
  	"transcript" jsonb,
  	"search_excerpt" varchar,
  	"search_keywords" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"meta_og_title" varchar,
  	"meta_og_description" varchar,
  	"meta_og_image_id" integer,
  	"meta_no_index" boolean DEFAULT false,
  	"video_type" "enum_videos_video_type" DEFAULT 'tutorial',
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_videos_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "videos_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"video_categories_id" integer
  );
  
  CREATE TABLE "_videos_v_version_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_videos_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_description" varchar,
  	"version_video_url" varchar,
  	"version_embed_code" varchar,
  	"version_duration" varchar,
  	"version_thumbnail_id" integer,
  	"version_transcript" jsonb,
  	"version_search_excerpt" varchar,
  	"version_search_keywords" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_og_title" varchar,
  	"version_meta_og_description" varchar,
  	"version_meta_og_image_id" integer,
  	"version_meta_no_index" boolean DEFAULT false,
  	"version_video_type" "enum__videos_v_version_video_type" DEFAULT 'tutorial',
  	"version_published_at" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__videos_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_videos_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"video_categories_id" integer
  );
  
  CREATE TABLE "video_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar,
  	"color" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "portfolios_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "portfolios_technologies" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE "portfolios" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"client" varchar,
  	"summary" varchar,
  	"description" jsonb,
  	"featured_image_id" integer,
  	"project_url" varchar,
  	"search_excerpt" varchar,
  	"search_keywords" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"meta_og_title" varchar,
  	"meta_og_description" varchar,
  	"meta_og_image_id" integer,
  	"meta_no_index" boolean DEFAULT false,
  	"reading_time" numeric,
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_portfolios_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "portfolios_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"portfolio_categories_id" integer
  );
  
  CREATE TABLE "_portfolios_v_version_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_portfolios_v_version_technologies" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_portfolios_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_client" varchar,
  	"version_summary" varchar,
  	"version_description" jsonb,
  	"version_featured_image_id" integer,
  	"version_project_url" varchar,
  	"version_search_excerpt" varchar,
  	"version_search_keywords" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_og_title" varchar,
  	"version_meta_og_description" varchar,
  	"version_meta_og_image_id" integer,
  	"version_meta_no_index" boolean DEFAULT false,
  	"version_reading_time" numeric,
  	"version_published_at" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__portfolios_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_portfolios_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"portfolio_categories_id" integer
  );
  
  CREATE TABLE "portfolio_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar,
  	"color" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "articles_takeaways" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "articles_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar
  );
  
  CREATE TABLE "articles" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"author" varchar,
  	"excerpt" varchar,
  	"takeaway_heading" varchar,
  	"content" jsonb,
  	"featured_image_id" integer,
  	"search_excerpt" varchar,
  	"search_keywords" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"meta_og_title" varchar,
  	"meta_og_description" varchar,
  	"meta_og_image_id" integer,
  	"meta_no_index" boolean DEFAULT false,
  	"reading_time" numeric,
  	"article_type" "enum_articles_article_type" DEFAULT 'article',
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_articles_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "articles_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"article_categories_id" integer
  );
  
  CREATE TABLE "_articles_v_version_takeaways" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_articles_v_version_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_articles_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_author" varchar,
  	"version_excerpt" varchar,
  	"version_takeaway_heading" varchar,
  	"version_content" jsonb,
  	"version_featured_image_id" integer,
  	"version_search_excerpt" varchar,
  	"version_search_keywords" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_og_title" varchar,
  	"version_meta_og_description" varchar,
  	"version_meta_og_image_id" integer,
  	"version_meta_no_index" boolean DEFAULT false,
  	"version_reading_time" numeric,
  	"version_article_type" "enum__articles_v_version_article_type" DEFAULT 'article',
  	"version_published_at" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__articles_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_articles_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"article_categories_id" integer
  );
  
  CREATE TABLE "article_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar,
  	"color" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "redirects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"from" varchar NOT NULL,
  	"to_type" "enum_redirects_to_type" DEFAULT 'reference',
  	"to_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "redirects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"domains_id" integer
  );
  
  CREATE TABLE "forms_blocks_checkbox" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"default_value" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_country" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_email" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_message" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"message" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_number" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_select_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_select" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"placeholder" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_state" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_textarea" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_emails" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email_to" varchar,
  	"cc" varchar,
  	"bcc" varchar,
  	"reply_to" varchar,
  	"email_from" varchar,
  	"subject" varchar DEFAULT 'You''ve received a new message.' NOT NULL,
  	"message" jsonb
  );
  
  CREATE TABLE "forms" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"submit_button_label" varchar,
  	"confirmation_type" "enum_forms_confirmation_type" DEFAULT 'message',
  	"confirmation_message" jsonb,
  	"redirect_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "form_submissions_submission_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"field" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "form_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "search_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"relation_to" varchar,
  	"category_i_d" varchar,
  	"title" varchar
  );
  
  CREATE TABLE "search" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"priority" numeric,
  	"slug" varchar,
  	"search_excerpt" varchar,
  	"search_keywords" varchar,
  	"featured" boolean DEFAULT false,
  	"content_image_id" integer,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "search_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"domains_id" integer,
  	"posts_id" integer,
  	"services_id" integer,
  	"videos_id" integer,
  	"portfolios_id" integer,
  	"articles_id" integer
  );
  
  CREATE TABLE "payload_mcp_api_keys" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"user_id" integer NOT NULL,
  	"label" varchar,
  	"description" varchar,
  	"posts_find" boolean DEFAULT false,
  	"posts_create" boolean DEFAULT false,
  	"posts_update" boolean DEFAULT false,
  	"posts_delete" boolean DEFAULT false,
  	"domains_find" boolean DEFAULT false,
  	"domains_create" boolean DEFAULT false,
  	"domains_update" boolean DEFAULT false,
  	"domains_delete" boolean DEFAULT false,
  	"articles_find" boolean DEFAULT false,
  	"articles_create" boolean DEFAULT false,
  	"articles_update" boolean DEFAULT false,
  	"articles_delete" boolean DEFAULT false,
  	"portfolios_find" boolean DEFAULT false,
  	"portfolios_create" boolean DEFAULT false,
  	"portfolios_update" boolean DEFAULT false,
  	"portfolios_delete" boolean DEFAULT false,
  	"services_find" boolean DEFAULT false,
  	"services_create" boolean DEFAULT false,
  	"services_update" boolean DEFAULT false,
  	"services_delete" boolean DEFAULT false,
  	"videos_find" boolean DEFAULT false,
  	"videos_create" boolean DEFAULT false,
  	"videos_update" boolean DEFAULT false,
  	"videos_delete" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"enable_a_p_i_key" boolean,
  	"api_key" varchar,
  	"api_key_index" varchar
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_jobs_log" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"executed_at" timestamp(3) with time zone NOT NULL,
  	"completed_at" timestamp(3) with time zone NOT NULL,
  	"task_slug" "enum_payload_jobs_log_task_slug" NOT NULL,
  	"task_i_d" varchar NOT NULL,
  	"input" jsonb,
  	"output" jsonb,
  	"state" "enum_payload_jobs_log_state" NOT NULL,
  	"error" jsonb
  );
  
  CREATE TABLE "payload_jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"input" jsonb,
  	"completed_at" timestamp(3) with time zone,
  	"total_tried" numeric DEFAULT 0,
  	"has_error" boolean DEFAULT false,
  	"error" jsonb,
  	"task_slug" "enum_payload_jobs_task_slug",
  	"queue" varchar DEFAULT 'default',
  	"wait_until" timestamp(3) with time zone,
  	"processing" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"domains_id" integer,
  	"domain_sets_id" integer,
  	"domain_inquiries_id" integer,
  	"domain_category_id" integer,
  	"media_id" integer,
  	"categories_id" integer,
  	"users_id" integer,
  	"services_id" integer,
  	"service_categories_id" integer,
  	"videos_id" integer,
  	"video_categories_id" integer,
  	"portfolios_id" integer,
  	"portfolio_categories_id" integer,
  	"articles_id" integer,
  	"article_categories_id" integer,
  	"redirects_id" integer,
  	"forms_id" integer,
  	"form_submissions_id" integer,
  	"search_id" integer,
  	"payload_mcp_api_keys_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"payload_mcp_api_keys_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "header_nav_items_submenu_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"link" varchar,
  	"icon" "enum_header_nav_items_submenu_items_icon",
  	"description" varchar
  );
  
  CREATE TABLE "header_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"link_label" varchar,
  	"link_type" "enum_header_nav_items_link_type" DEFAULT 'internal',
  	"link_external_url" varchar,
  	"link_new_tab" boolean DEFAULT false,
  	"link_anchor" varchar,
  	"link_aria_label" varchar,
  	"link_nofollow" boolean DEFAULT false,
  	"link_noreferrer" boolean DEFAULT false,
  	"link_sponsored" boolean DEFAULT false,
  	"link_utm_source" varchar,
  	"link_utm_medium" varchar,
  	"link_utm_campaign" varchar,
  	"link_utm_content" varchar,
  	"nav_group" "enum_header_nav_items_nav_group" DEFAULT 'primary',
  	"icon" "enum_header_nav_items_icon",
  	"description" varchar,
  	"show_on_mobile" boolean DEFAULT false,
  	"submenu_type" "enum_header_nav_items_submenu_type" DEFAULT 'none',
  	"submenu_columns" "enum_header_nav_items_submenu_columns" DEFAULT '2',
  	"mega_menu_featured_title" varchar,
  	"mega_menu_featured_subtitle" varchar,
  	"mega_menu_featured_description" varchar,
  	"mega_menu_featured_image_id" integer,
  	"mega_menu_featured_link" varchar,
  	"mega_menu_featured_link_label" varchar,
  	"submenu_footer_text" varchar,
  	"submenu_footer_primary_c_t_a_label" varchar,
  	"submenu_footer_primary_c_t_a_link" varchar,
  	"submenu_footer_secondary_c_t_a_label" varchar,
  	"submenu_footer_secondary_c_t_a_link" varchar
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nav_position" "enum_header_nav_position" DEFAULT 'left',
  	"separator" "enum_header_separator" DEFAULT 'border',
  	"sticky_desktop" boolean DEFAULT true,
  	"sticky_mobile" boolean DEFAULT true,
  	"search_display" "enum_header_search_display" DEFAULT 'icon',
  	"mobile_search_outside" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "header_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"domains_id" integer,
  	"services_id" integer,
  	"videos_id" integer,
  	"portfolios_id" integer,
  	"articles_id" integer
  );
  
  CREATE TABLE "footer_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"link_label" varchar NOT NULL,
  	"link_type" "enum_footer_nav_items_link_type" DEFAULT 'internal',
  	"link_external_url" varchar,
  	"link_new_tab" boolean DEFAULT false,
  	"link_anchor" varchar,
  	"link_aria_label" varchar,
  	"link_nofollow" boolean DEFAULT false,
  	"link_noreferrer" boolean DEFAULT false,
  	"link_sponsored" boolean DEFAULT false,
  	"link_utm_source" varchar,
  	"link_utm_medium" varchar,
  	"link_utm_campaign" varchar,
  	"link_utm_content" varchar
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"services_id" integer
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_name" varchar DEFAULT 'Domains Portfolio' NOT NULL,
  	"language" "enum_site_settings_language" DEFAULT 'english' NOT NULL,
  	"locale" "enum_site_settings_locale" DEFAULT 'en-US' NOT NULL,
  	"brand_primary" varchar DEFAULT '#1B243F' NOT NULL,
  	"brand_alt" varchar DEFAULT '#F0A848' NOT NULL,
  	"brand_background" varchar DEFAULT '#FFFFFF' NOT NULL,
  	"brand_surface" varchar DEFAULT '#F5F7FF' NOT NULL,
  	"brand_copy" varchar DEFAULT '#1F2933' NOT NULL,
  	"brand_muted" varchar DEFAULT '#6B7280' NOT NULL,
  	"brand_border" varchar DEFAULT '#E2E8F0' NOT NULL,
  	"typography_heading_weight" "enum_site_settings_typography_heading_weight" DEFAULT '600',
  	"typography_body_weight" "enum_site_settings_typography_body_weight" DEFAULT '400',
  	"typography_base_size" "enum_site_settings_typography_base_size" DEFAULT '16px',
  	"layout_container_width" "enum_site_settings_layout_container_width" DEFAULT '1140px',
  	"layout_border_radius" "enum_site_settings_layout_border_radius" DEFAULT '12px',
  	"logo_id" integer NOT NULL,
  	"default_og_image_id" integer,
  	"default_og_title" varchar,
  	"default_og_description" varchar,
  	"site_description" varchar,
  	"gtm_container_id" varchar,
  	"ga_measurement_id" varchar,
  	"google_search_console_code" varchar,
  	"enable_cookie_consent" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "cta_settings_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"enable_button_options" boolean DEFAULT false,
  	"default_button_color" "enum_cta_settings_groups_default_button_color" DEFAULT 'brand-primary',
  	"default_button_variant" "enum_cta_settings_groups_default_button_variant" DEFAULT 'filled',
  	"default_button_size" "enum_cta_settings_groups_default_button_size" DEFAULT 'default'
  );
  
  CREATE TABLE "cta_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "domains_settings_default_content_rich_summary_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"bullet" varchar NOT NULL
  );
  
  CREATE TABLE "domains_settings_default_content_use_cases" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"use_case" varchar NOT NULL
  );
  
  CREATE TABLE "domains_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"page_title" varchar DEFAULT 'ドメインポートフォリオ' NOT NULL,
  	"page_desc" varchar DEFAULT 'プレミアムドメインをご覧ください。',
  	"premium_title" varchar DEFAULT '注目のドメイン',
  	"premium_subtitle" varchar DEFAULT '厳選されたプレミアムドメインをご紹介します',
  	"hero_image_id" integer,
  	"default_image_id" integer,
  	"disclaimer" varchar DEFAULT '※ 表示金額は最低希望価格です。実際の取引金額はご相談の上で決定します。ドメインの移管には別途手数料がかかる場合があります。',
  	"display_per_page" numeric DEFAULT 12,
  	"display_sort_field" "enum_domains_settings_display_sort_field" DEFAULT 'domainName',
  	"display_sort_dir" "enum_domains_settings_display_sort_dir" DEFAULT 'asc',
  	"display_show_featured" boolean DEFAULT true,
  	"display_enable_price_shorthand" boolean DEFAULT false,
  	"currency_code" "enum_domains_settings_currency_code" DEFAULT 'JPY',
  	"currency_show_decimals" boolean DEFAULT false,
  	"contact_form_enable_contact_form" boolean DEFAULT true,
  	"contact_form_form_template_id" integer,
  	"contact_form_form_heading" varchar DEFAULT 'オーナーに連絡',
  	"contact_form_form_description" varchar DEFAULT 'ご質問やオファーをお送りください。1営業日以内にご連絡いたします。',
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"og_title" varchar,
  	"og_description" varchar,
  	"og_image_id" integer,
  	"no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "services_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"page_title" varchar DEFAULT '事業内容',
  	"page_subtitle" varchar DEFAULT 'rePlayは東京を拠点に、プロジェクト開発からデジタルマーケティング、ドメインポートフォリオの戦略的管理まで、一貫した支援を提供します。',
  	"page_intro" jsonb,
  	"hero_image_id" integer,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"og_title" varchar,
  	"og_description" varchar,
  	"og_image_id" integer,
  	"no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "videos_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"page_title" varchar DEFAULT '動画',
  	"page_subtitle" varchar DEFAULT '動画コンテンツの一覧です。',
  	"page_intro" jsonb,
  	"hero_image_id" integer,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"og_title" varchar,
  	"og_description" varchar,
  	"og_image_id" integer,
  	"no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "portfolios_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"page_title" varchar DEFAULT 'ポートフォリオ',
  	"page_subtitle" varchar DEFAULT '制作実績の一覧です。',
  	"page_intro" jsonb,
  	"hero_image_id" integer,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"og_title" varchar,
  	"og_description" varchar,
  	"og_image_id" integer,
  	"no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "articles_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"page_title" varchar DEFAULT '記事',
  	"page_subtitle" varchar DEFAULT 'デジタル戦略、技術事例、業界分析に関する深掘りコンテンツをお届けします。',
  	"page_intro" jsonb,
  	"hero_image_id" integer,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"og_title" varchar,
  	"og_description" varchar,
  	"og_image_id" integer,
  	"no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "posts_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"page_title" varchar DEFAULT 'ブログ',
  	"page_subtitle" varchar DEFAULT 'ドメイン管理、Web開発、デジタルマーケティングに関する最新の知見をお届けします。',
  	"page_intro" jsonb,
  	"hero_image_id" integer,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"og_title" varchar,
  	"og_description" varchar,
  	"og_image_id" integer,
  	"no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "pages_blocks_accordion_items" ADD CONSTRAINT "pages_blocks_accordion_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_accordion" ADD CONSTRAINT "pages_blocks_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_action_card_grid_cards" ADD CONSTRAINT "pages_blocks_action_card_grid_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_action_card_grid_cards" ADD CONSTRAINT "pages_blocks_action_card_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_action_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_action_card_grid" ADD CONSTRAINT "pages_blocks_action_card_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_archive" ADD CONSTRAINT "pages_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_links" ADD CONSTRAINT "pages_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_capabilities_grid_items" ADD CONSTRAINT "pages_blocks_capabilities_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_capabilities_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_capabilities_grid" ADD CONSTRAINT "pages_blocks_capabilities_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_centered_content" ADD CONSTRAINT "pages_blocks_centered_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_client_logos_clients" ADD CONSTRAINT "pages_blocks_client_logos_clients_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_client_logos_clients" ADD CONSTRAINT "pages_blocks_client_logos_clients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_client_logos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_client_logos" ADD CONSTRAINT "pages_blocks_client_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_company_facts_facts" ADD CONSTRAINT "pages_blocks_company_facts_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_company_facts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_company_facts" ADD CONSTRAINT "pages_blocks_company_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_info" ADD CONSTRAINT "pages_blocks_contact_info_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_code" ADD CONSTRAINT "pages_blocks_code_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_columns" ADD CONSTRAINT "pages_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content" ADD CONSTRAINT "pages_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_domain_showcase" ADD CONSTRAINT "pages_blocks_domain_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_form_block" ADD CONSTRAINT "pages_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_form_block" ADD CONSTRAINT "pages_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_carousel_slides" ADD CONSTRAINT "pages_blocks_hero_carousel_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_carousel_slides" ADD CONSTRAINT "pages_blocks_hero_carousel_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_carousel" ADD CONSTRAINT "pages_blocks_hero_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_header_slides" ADD CONSTRAINT "pages_blocks_hero_header_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_header_slides" ADD CONSTRAINT "pages_blocks_hero_header_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero_header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_header" ADD CONSTRAINT "pages_blocks_hero_header_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_header" ADD CONSTRAINT "pages_blocks_hero_header_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_gallery_images" ADD CONSTRAINT "pages_blocks_image_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_gallery_images" ADD CONSTRAINT "pages_blocks_image_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_image_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_gallery" ADD CONSTRAINT "pages_blocks_image_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_block" ADD CONSTRAINT "pages_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_block" ADD CONSTRAINT "pages_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_metrics_bar_items" ADD CONSTRAINT "pages_blocks_metrics_bar_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_metrics_bar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_metrics_bar" ADD CONSTRAINT "pages_blocks_metrics_bar_content_image_id_media_id_fk" FOREIGN KEY ("content_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_metrics_bar" ADD CONSTRAINT "pages_blocks_metrics_bar_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_notice" ADD CONSTRAINT "pages_blocks_notice_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_portfolio_cards_projects" ADD CONSTRAINT "pages_blocks_portfolio_cards_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_portfolio_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_portfolio_cards" ADD CONSTRAINT "pages_blocks_portfolio_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_block" ADD CONSTRAINT "pages_blocks_services_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_split1x2" ADD CONSTRAINT "pages_blocks_split1x2_small_column_image_id_media_id_fk" FOREIGN KEY ("small_column_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_split1x2" ADD CONSTRAINT "pages_blocks_split1x2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_split_section" ADD CONSTRAINT "pages_blocks_split_section_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_split_section" ADD CONSTRAINT "pages_blocks_split_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tabs_tabs" ADD CONSTRAINT "pages_blocks_tabs_tabs_tab_image_id_media_id_fk" FOREIGN KEY ("tab_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_tabs_tabs" ADD CONSTRAINT "pages_blocks_tabs_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tabs" ADD CONSTRAINT "pages_blocks_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_thesis_stats_stats" ADD CONSTRAINT "pages_blocks_thesis_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_thesis_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_thesis_stats" ADD CONSTRAINT "pages_blocks_thesis_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_og_image_id_media_id_fk" FOREIGN KEY ("meta_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_domains_fk" FOREIGN KEY ("domains_id") REFERENCES "public"."domains"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_videos_fk" FOREIGN KEY ("videos_id") REFERENCES "public"."videos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_portfolios_fk" FOREIGN KEY ("portfolios_id") REFERENCES "public"."portfolios"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_domain_category_fk" FOREIGN KEY ("domain_category_id") REFERENCES "public"."domain_category"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_accordion_items" ADD CONSTRAINT "_pages_v_blocks_accordion_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_accordion" ADD CONSTRAINT "_pages_v_blocks_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_action_card_grid_cards" ADD CONSTRAINT "_pages_v_blocks_action_card_grid_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_action_card_grid_cards" ADD CONSTRAINT "_pages_v_blocks_action_card_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_action_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_action_card_grid" ADD CONSTRAINT "_pages_v_blocks_action_card_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_archive" ADD CONSTRAINT "_pages_v_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_links" ADD CONSTRAINT "_pages_v_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_capabilities_grid_items" ADD CONSTRAINT "_pages_v_blocks_capabilities_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_capabilities_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_capabilities_grid" ADD CONSTRAINT "_pages_v_blocks_capabilities_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_centered_content" ADD CONSTRAINT "_pages_v_blocks_centered_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_client_logos_clients" ADD CONSTRAINT "_pages_v_blocks_client_logos_clients_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_client_logos_clients" ADD CONSTRAINT "_pages_v_blocks_client_logos_clients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_client_logos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_client_logos" ADD CONSTRAINT "_pages_v_blocks_client_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_company_facts_facts" ADD CONSTRAINT "_pages_v_blocks_company_facts_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_company_facts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_company_facts" ADD CONSTRAINT "_pages_v_blocks_company_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_info" ADD CONSTRAINT "_pages_v_blocks_contact_info_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_code" ADD CONSTRAINT "_pages_v_blocks_code_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD CONSTRAINT "_pages_v_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content" ADD CONSTRAINT "_pages_v_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_domain_showcase" ADD CONSTRAINT "_pages_v_blocks_domain_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_form_block" ADD CONSTRAINT "_pages_v_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_form_block" ADD CONSTRAINT "_pages_v_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_carousel_slides" ADD CONSTRAINT "_pages_v_blocks_hero_carousel_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_carousel_slides" ADD CONSTRAINT "_pages_v_blocks_hero_carousel_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_carousel" ADD CONSTRAINT "_pages_v_blocks_hero_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_header_slides" ADD CONSTRAINT "_pages_v_blocks_hero_header_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_header_slides" ADD CONSTRAINT "_pages_v_blocks_hero_header_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero_header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_header" ADD CONSTRAINT "_pages_v_blocks_hero_header_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_header" ADD CONSTRAINT "_pages_v_blocks_hero_header_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_gallery_images" ADD CONSTRAINT "_pages_v_blocks_image_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_gallery_images" ADD CONSTRAINT "_pages_v_blocks_image_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_image_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_gallery" ADD CONSTRAINT "_pages_v_blocks_image_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_block" ADD CONSTRAINT "_pages_v_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_block" ADD CONSTRAINT "_pages_v_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_metrics_bar_items" ADD CONSTRAINT "_pages_v_blocks_metrics_bar_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_metrics_bar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_metrics_bar" ADD CONSTRAINT "_pages_v_blocks_metrics_bar_content_image_id_media_id_fk" FOREIGN KEY ("content_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_metrics_bar" ADD CONSTRAINT "_pages_v_blocks_metrics_bar_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_notice" ADD CONSTRAINT "_pages_v_blocks_notice_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_portfolio_cards_projects" ADD CONSTRAINT "_pages_v_blocks_portfolio_cards_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_portfolio_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_portfolio_cards" ADD CONSTRAINT "_pages_v_blocks_portfolio_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services_block" ADD CONSTRAINT "_pages_v_blocks_services_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_split1x2" ADD CONSTRAINT "_pages_v_blocks_split1x2_small_column_image_id_media_id_fk" FOREIGN KEY ("small_column_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_split1x2" ADD CONSTRAINT "_pages_v_blocks_split1x2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_split_section" ADD CONSTRAINT "_pages_v_blocks_split_section_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_split_section" ADD CONSTRAINT "_pages_v_blocks_split_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tabs_tabs" ADD CONSTRAINT "_pages_v_blocks_tabs_tabs_tab_image_id_media_id_fk" FOREIGN KEY ("tab_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tabs_tabs" ADD CONSTRAINT "_pages_v_blocks_tabs_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tabs" ADD CONSTRAINT "_pages_v_blocks_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_thesis_stats_stats" ADD CONSTRAINT "_pages_v_blocks_thesis_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_thesis_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_thesis_stats" ADD CONSTRAINT "_pages_v_blocks_thesis_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_meta_og_image_id_media_id_fk" FOREIGN KEY ("version_meta_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_domains_fk" FOREIGN KEY ("domains_id") REFERENCES "public"."domains"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_videos_fk" FOREIGN KEY ("videos_id") REFERENCES "public"."videos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_portfolios_fk" FOREIGN KEY ("portfolios_id") REFERENCES "public"."portfolios"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_domain_category_fk" FOREIGN KEY ("domain_category_id") REFERENCES "public"."domain_category"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_takeaways" ADD CONSTRAINT "posts_takeaways_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_tags" ADD CONSTRAINT "posts_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_populated_authors" ADD CONSTRAINT "posts_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_meta_og_image_id_media_id_fk" FOREIGN KEY ("meta_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_takeaways" ADD CONSTRAINT "_posts_v_version_takeaways_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_tags" ADD CONSTRAINT "_posts_v_version_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_populated_authors" ADD CONSTRAINT "_posts_v_version_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_meta_og_image_id_media_id_fk" FOREIGN KEY ("version_meta_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "domains_rich_summary_bullets" ADD CONSTRAINT "domains_rich_summary_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."domains"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "domains_use_cases" ADD CONSTRAINT "domains_use_cases_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."domains"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "domains" ADD CONSTRAINT "domains_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "domains" ADD CONSTRAINT "domains_category_id_domain_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."domain_category"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "domains" ADD CONSTRAINT "domains_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "domains" ADD CONSTRAINT "domains_meta_og_image_id_media_id_fk" FOREIGN KEY ("meta_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_domains_v_version_rich_summary_bullets" ADD CONSTRAINT "_domains_v_version_rich_summary_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_domains_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_domains_v_version_use_cases" ADD CONSTRAINT "_domains_v_version_use_cases_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_domains_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_domains_v" ADD CONSTRAINT "_domains_v_parent_id_domains_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."domains"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_domains_v" ADD CONSTRAINT "_domains_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_domains_v" ADD CONSTRAINT "_domains_v_version_category_id_domain_category_id_fk" FOREIGN KEY ("version_category_id") REFERENCES "public"."domain_category"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_domains_v" ADD CONSTRAINT "_domains_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_domains_v" ADD CONSTRAINT "_domains_v_version_meta_og_image_id_media_id_fk" FOREIGN KEY ("version_meta_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "domain_sets_rels" ADD CONSTRAINT "domain_sets_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."domain_sets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "domain_sets_rels" ADD CONSTRAINT "domain_sets_rels_domains_fk" FOREIGN KEY ("domains_id") REFERENCES "public"."domains"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "domain_inquiries" ADD CONSTRAINT "domain_inquiries_domain_id_domains_id_fk" FOREIGN KEY ("domain_id") REFERENCES "public"."domains"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categories_breadcrumbs" ADD CONSTRAINT "categories_breadcrumbs_doc_id_categories_id_fk" FOREIGN KEY ("doc_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categories_breadcrumbs" ADD CONSTRAINT "categories_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories" ADD CONSTRAINT "categories_parent_id_categories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_deliverables" ADD CONSTRAINT "services_deliverables_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_authority_section_items" ADD CONSTRAINT "services_authority_section_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_accordion_items" ADD CONSTRAINT "services_blocks_accordion_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_accordion" ADD CONSTRAINT "services_blocks_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_action_card_grid_cards" ADD CONSTRAINT "services_blocks_action_card_grid_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_action_card_grid_cards" ADD CONSTRAINT "services_blocks_action_card_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_action_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_action_card_grid" ADD CONSTRAINT "services_blocks_action_card_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_cta_links" ADD CONSTRAINT "services_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_cta" ADD CONSTRAINT "services_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_centered_content" ADD CONSTRAINT "services_blocks_centered_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_content_columns" ADD CONSTRAINT "services_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_content" ADD CONSTRAINT "services_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_hero_carousel_slides" ADD CONSTRAINT "services_blocks_hero_carousel_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_hero_carousel_slides" ADD CONSTRAINT "services_blocks_hero_carousel_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_hero_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_hero_carousel" ADD CONSTRAINT "services_blocks_hero_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_image_gallery_images" ADD CONSTRAINT "services_blocks_image_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_image_gallery_images" ADD CONSTRAINT "services_blocks_image_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_image_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_image_gallery" ADD CONSTRAINT "services_blocks_image_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_metrics_bar_items" ADD CONSTRAINT "services_blocks_metrics_bar_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_metrics_bar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_metrics_bar" ADD CONSTRAINT "services_blocks_metrics_bar_content_image_id_media_id_fk" FOREIGN KEY ("content_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_metrics_bar" ADD CONSTRAINT "services_blocks_metrics_bar_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_notice" ADD CONSTRAINT "services_blocks_notice_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_split1x2" ADD CONSTRAINT "services_blocks_split1x2_small_column_image_id_media_id_fk" FOREIGN KEY ("small_column_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_split1x2" ADD CONSTRAINT "services_blocks_split1x2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_split_section" ADD CONSTRAINT "services_blocks_split_section_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_split_section" ADD CONSTRAINT "services_blocks_split_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_tabs_tabs" ADD CONSTRAINT "services_blocks_tabs_tabs_tab_image_id_media_id_fk" FOREIGN KEY ("tab_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_blocks_tabs_tabs" ADD CONSTRAINT "services_blocks_tabs_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_tabs" ADD CONSTRAINT "services_blocks_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_category_id_service_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."service_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_meta_og_image_id_media_id_fk" FOREIGN KEY ("meta_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_domains_fk" FOREIGN KEY ("domains_id") REFERENCES "public"."domains"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_videos_fk" FOREIGN KEY ("videos_id") REFERENCES "public"."videos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_portfolios_fk" FOREIGN KEY ("portfolios_id") REFERENCES "public"."portfolios"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "videos_tags" ADD CONSTRAINT "videos_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."videos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "videos" ADD CONSTRAINT "videos_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "videos" ADD CONSTRAINT "videos_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "videos" ADD CONSTRAINT "videos_meta_og_image_id_media_id_fk" FOREIGN KEY ("meta_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "videos_rels" ADD CONSTRAINT "videos_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."videos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "videos_rels" ADD CONSTRAINT "videos_rels_video_categories_fk" FOREIGN KEY ("video_categories_id") REFERENCES "public"."video_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_videos_v_version_tags" ADD CONSTRAINT "_videos_v_version_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_videos_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_videos_v" ADD CONSTRAINT "_videos_v_parent_id_videos_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."videos"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_videos_v" ADD CONSTRAINT "_videos_v_version_thumbnail_id_media_id_fk" FOREIGN KEY ("version_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_videos_v" ADD CONSTRAINT "_videos_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_videos_v" ADD CONSTRAINT "_videos_v_version_meta_og_image_id_media_id_fk" FOREIGN KEY ("version_meta_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_videos_v_rels" ADD CONSTRAINT "_videos_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_videos_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_videos_v_rels" ADD CONSTRAINT "_videos_v_rels_video_categories_fk" FOREIGN KEY ("video_categories_id") REFERENCES "public"."video_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolios_gallery" ADD CONSTRAINT "portfolios_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "portfolios_gallery" ADD CONSTRAINT "portfolios_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."portfolios"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolios_technologies" ADD CONSTRAINT "portfolios_technologies_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."portfolios"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolios" ADD CONSTRAINT "portfolios_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "portfolios" ADD CONSTRAINT "portfolios_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "portfolios" ADD CONSTRAINT "portfolios_meta_og_image_id_media_id_fk" FOREIGN KEY ("meta_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "portfolios_rels" ADD CONSTRAINT "portfolios_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."portfolios"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolios_rels" ADD CONSTRAINT "portfolios_rels_portfolio_categories_fk" FOREIGN KEY ("portfolio_categories_id") REFERENCES "public"."portfolio_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_portfolios_v_version_gallery" ADD CONSTRAINT "_portfolios_v_version_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_portfolios_v_version_gallery" ADD CONSTRAINT "_portfolios_v_version_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_portfolios_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_portfolios_v_version_technologies" ADD CONSTRAINT "_portfolios_v_version_technologies_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_portfolios_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_portfolios_v" ADD CONSTRAINT "_portfolios_v_parent_id_portfolios_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."portfolios"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_portfolios_v" ADD CONSTRAINT "_portfolios_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_portfolios_v" ADD CONSTRAINT "_portfolios_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_portfolios_v" ADD CONSTRAINT "_portfolios_v_version_meta_og_image_id_media_id_fk" FOREIGN KEY ("version_meta_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_portfolios_v_rels" ADD CONSTRAINT "_portfolios_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_portfolios_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_portfolios_v_rels" ADD CONSTRAINT "_portfolios_v_rels_portfolio_categories_fk" FOREIGN KEY ("portfolio_categories_id") REFERENCES "public"."portfolio_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_takeaways" ADD CONSTRAINT "articles_takeaways_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_tags" ADD CONSTRAINT "articles_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_meta_og_image_id_media_id_fk" FOREIGN KEY ("meta_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_article_categories_fk" FOREIGN KEY ("article_categories_id") REFERENCES "public"."article_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_version_takeaways" ADD CONSTRAINT "_articles_v_version_takeaways_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_version_tags" ADD CONSTRAINT "_articles_v_version_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_parent_id_articles_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."articles"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_version_meta_og_image_id_media_id_fk" FOREIGN KEY ("version_meta_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_rels" ADD CONSTRAINT "_articles_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_rels" ADD CONSTRAINT "_articles_v_rels_article_categories_fk" FOREIGN KEY ("article_categories_id") REFERENCES "public"."article_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_domains_fk" FOREIGN KEY ("domains_id") REFERENCES "public"."domains"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_checkbox" ADD CONSTRAINT "forms_blocks_checkbox_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_country" ADD CONSTRAINT "forms_blocks_country_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_email" ADD CONSTRAINT "forms_blocks_email_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_message" ADD CONSTRAINT "forms_blocks_message_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_number" ADD CONSTRAINT "forms_blocks_number_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select_options" ADD CONSTRAINT "forms_blocks_select_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select" ADD CONSTRAINT "forms_blocks_select_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_state" ADD CONSTRAINT "forms_blocks_state_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_text" ADD CONSTRAINT "forms_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_textarea" ADD CONSTRAINT "forms_blocks_textarea_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_emails" ADD CONSTRAINT "forms_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions_submission_data" ADD CONSTRAINT "form_submissions_submission_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "search_categories" ADD CONSTRAINT "search_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search" ADD CONSTRAINT "search_content_image_id_media_id_fk" FOREIGN KEY ("content_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "search" ADD CONSTRAINT "search_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_domains_fk" FOREIGN KEY ("domains_id") REFERENCES "public"."domains"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_videos_fk" FOREIGN KEY ("videos_id") REFERENCES "public"."videos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_portfolios_fk" FOREIGN KEY ("portfolios_id") REFERENCES "public"."portfolios"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_mcp_api_keys" ADD CONSTRAINT "payload_mcp_api_keys_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_domains_fk" FOREIGN KEY ("domains_id") REFERENCES "public"."domains"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_domain_sets_fk" FOREIGN KEY ("domain_sets_id") REFERENCES "public"."domain_sets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_domain_inquiries_fk" FOREIGN KEY ("domain_inquiries_id") REFERENCES "public"."domain_inquiries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_domain_category_fk" FOREIGN KEY ("domain_category_id") REFERENCES "public"."domain_category"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_service_categories_fk" FOREIGN KEY ("service_categories_id") REFERENCES "public"."service_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_videos_fk" FOREIGN KEY ("videos_id") REFERENCES "public"."videos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_video_categories_fk" FOREIGN KEY ("video_categories_id") REFERENCES "public"."video_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_portfolios_fk" FOREIGN KEY ("portfolios_id") REFERENCES "public"."portfolios"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_portfolio_categories_fk" FOREIGN KEY ("portfolio_categories_id") REFERENCES "public"."portfolio_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_article_categories_fk" FOREIGN KEY ("article_categories_id") REFERENCES "public"."article_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_redirects_fk" FOREIGN KEY ("redirects_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_forms_fk" FOREIGN KEY ("forms_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_submissions_fk" FOREIGN KEY ("form_submissions_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_search_fk" FOREIGN KEY ("search_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_mcp_api_keys_fk" FOREIGN KEY ("payload_mcp_api_keys_id") REFERENCES "public"."payload_mcp_api_keys"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_payload_mcp_api_keys_fk" FOREIGN KEY ("payload_mcp_api_keys_id") REFERENCES "public"."payload_mcp_api_keys"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_submenu_items" ADD CONSTRAINT "header_nav_items_submenu_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_mega_menu_featured_image_id_media_id_fk" FOREIGN KEY ("mega_menu_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_domains_fk" FOREIGN KEY ("domains_id") REFERENCES "public"."domains"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_videos_fk" FOREIGN KEY ("videos_id") REFERENCES "public"."videos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_portfolios_fk" FOREIGN KEY ("portfolios_id") REFERENCES "public"."portfolios"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_nav_items" ADD CONSTRAINT "footer_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_default_og_image_id_media_id_fk" FOREIGN KEY ("default_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cta_settings_groups" ADD CONSTRAINT "cta_settings_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cta_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "domains_settings_default_content_rich_summary_bullets" ADD CONSTRAINT "domains_settings_default_content_rich_summary_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."domains_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "domains_settings_default_content_use_cases" ADD CONSTRAINT "domains_settings_default_content_use_cases_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."domains_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "domains_settings" ADD CONSTRAINT "domains_settings_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "domains_settings" ADD CONSTRAINT "domains_settings_default_image_id_media_id_fk" FOREIGN KEY ("default_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "domains_settings" ADD CONSTRAINT "domains_settings_contact_form_form_template_id_forms_id_fk" FOREIGN KEY ("contact_form_form_template_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "domains_settings" ADD CONSTRAINT "domains_settings_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_settings" ADD CONSTRAINT "services_settings_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_settings" ADD CONSTRAINT "services_settings_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "videos_settings" ADD CONSTRAINT "videos_settings_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "videos_settings" ADD CONSTRAINT "videos_settings_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "portfolios_settings" ADD CONSTRAINT "portfolios_settings_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "portfolios_settings" ADD CONSTRAINT "portfolios_settings_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_settings" ADD CONSTRAINT "articles_settings_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_settings" ADD CONSTRAINT "articles_settings_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_settings" ADD CONSTRAINT "posts_settings_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_settings" ADD CONSTRAINT "posts_settings_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_accordion_items_order_idx" ON "pages_blocks_accordion_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_accordion_items_parent_id_idx" ON "pages_blocks_accordion_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_accordion_order_idx" ON "pages_blocks_accordion" USING btree ("_order");
  CREATE INDEX "pages_blocks_accordion_parent_id_idx" ON "pages_blocks_accordion" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_accordion_path_idx" ON "pages_blocks_accordion" USING btree ("_path");
  CREATE INDEX "pages_blocks_action_card_grid_cards_order_idx" ON "pages_blocks_action_card_grid_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_action_card_grid_cards_parent_id_idx" ON "pages_blocks_action_card_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_action_card_grid_cards_image_idx" ON "pages_blocks_action_card_grid_cards" USING btree ("image_id");
  CREATE INDEX "pages_blocks_action_card_grid_order_idx" ON "pages_blocks_action_card_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_action_card_grid_parent_id_idx" ON "pages_blocks_action_card_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_action_card_grid_path_idx" ON "pages_blocks_action_card_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_archive_order_idx" ON "pages_blocks_archive" USING btree ("_order");
  CREATE INDEX "pages_blocks_archive_parent_id_idx" ON "pages_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_archive_path_idx" ON "pages_blocks_archive" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_links_order_idx" ON "pages_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_links_parent_id_idx" ON "pages_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_order_idx" ON "pages_blocks_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_parent_id_idx" ON "pages_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_path_idx" ON "pages_blocks_cta" USING btree ("_path");
  CREATE INDEX "pages_blocks_capabilities_grid_items_order_idx" ON "pages_blocks_capabilities_grid_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_capabilities_grid_items_parent_id_idx" ON "pages_blocks_capabilities_grid_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_capabilities_grid_order_idx" ON "pages_blocks_capabilities_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_capabilities_grid_parent_id_idx" ON "pages_blocks_capabilities_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_capabilities_grid_path_idx" ON "pages_blocks_capabilities_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_centered_content_order_idx" ON "pages_blocks_centered_content" USING btree ("_order");
  CREATE INDEX "pages_blocks_centered_content_parent_id_idx" ON "pages_blocks_centered_content" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_centered_content_path_idx" ON "pages_blocks_centered_content" USING btree ("_path");
  CREATE INDEX "pages_blocks_client_logos_clients_order_idx" ON "pages_blocks_client_logos_clients" USING btree ("_order");
  CREATE INDEX "pages_blocks_client_logos_clients_parent_id_idx" ON "pages_blocks_client_logos_clients" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_client_logos_clients_logo_idx" ON "pages_blocks_client_logos_clients" USING btree ("logo_id");
  CREATE INDEX "pages_blocks_client_logos_order_idx" ON "pages_blocks_client_logos" USING btree ("_order");
  CREATE INDEX "pages_blocks_client_logos_parent_id_idx" ON "pages_blocks_client_logos" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_client_logos_path_idx" ON "pages_blocks_client_logos" USING btree ("_path");
  CREATE INDEX "pages_blocks_company_facts_facts_order_idx" ON "pages_blocks_company_facts_facts" USING btree ("_order");
  CREATE INDEX "pages_blocks_company_facts_facts_parent_id_idx" ON "pages_blocks_company_facts_facts" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_company_facts_order_idx" ON "pages_blocks_company_facts" USING btree ("_order");
  CREATE INDEX "pages_blocks_company_facts_parent_id_idx" ON "pages_blocks_company_facts" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_company_facts_path_idx" ON "pages_blocks_company_facts" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_info_order_idx" ON "pages_blocks_contact_info" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_info_parent_id_idx" ON "pages_blocks_contact_info" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_info_path_idx" ON "pages_blocks_contact_info" USING btree ("_path");
  CREATE INDEX "pages_blocks_code_order_idx" ON "pages_blocks_code" USING btree ("_order");
  CREATE INDEX "pages_blocks_code_parent_id_idx" ON "pages_blocks_code" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_code_path_idx" ON "pages_blocks_code" USING btree ("_path");
  CREATE INDEX "pages_blocks_content_columns_order_idx" ON "pages_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_columns_parent_id_idx" ON "pages_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_order_idx" ON "pages_blocks_content" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_parent_id_idx" ON "pages_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_path_idx" ON "pages_blocks_content" USING btree ("_path");
  CREATE INDEX "pages_blocks_domain_showcase_order_idx" ON "pages_blocks_domain_showcase" USING btree ("_order");
  CREATE INDEX "pages_blocks_domain_showcase_parent_id_idx" ON "pages_blocks_domain_showcase" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_domain_showcase_path_idx" ON "pages_blocks_domain_showcase" USING btree ("_path");
  CREATE INDEX "pages_blocks_form_block_order_idx" ON "pages_blocks_form_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_form_block_parent_id_idx" ON "pages_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_form_block_path_idx" ON "pages_blocks_form_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_form_block_form_idx" ON "pages_blocks_form_block" USING btree ("form_id");
  CREATE INDEX "pages_blocks_hero_carousel_slides_order_idx" ON "pages_blocks_hero_carousel_slides" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_carousel_slides_parent_id_idx" ON "pages_blocks_hero_carousel_slides" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_carousel_slides_image_idx" ON "pages_blocks_hero_carousel_slides" USING btree ("image_id");
  CREATE INDEX "pages_blocks_hero_carousel_order_idx" ON "pages_blocks_hero_carousel" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_carousel_parent_id_idx" ON "pages_blocks_hero_carousel" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_carousel_path_idx" ON "pages_blocks_hero_carousel" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_header_slides_order_idx" ON "pages_blocks_hero_header_slides" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_header_slides_parent_id_idx" ON "pages_blocks_hero_header_slides" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_header_slides_image_idx" ON "pages_blocks_hero_header_slides" USING btree ("image_id");
  CREATE INDEX "pages_blocks_hero_header_order_idx" ON "pages_blocks_hero_header" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_header_parent_id_idx" ON "pages_blocks_hero_header" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_header_path_idx" ON "pages_blocks_hero_header" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_header_image_idx" ON "pages_blocks_hero_header" USING btree ("image_id");
  CREATE INDEX "pages_blocks_image_gallery_images_order_idx" ON "pages_blocks_image_gallery_images" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_gallery_images_parent_id_idx" ON "pages_blocks_image_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_gallery_images_image_idx" ON "pages_blocks_image_gallery_images" USING btree ("image_id");
  CREATE INDEX "pages_blocks_image_gallery_order_idx" ON "pages_blocks_image_gallery" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_gallery_parent_id_idx" ON "pages_blocks_image_gallery" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_gallery_path_idx" ON "pages_blocks_image_gallery" USING btree ("_path");
  CREATE INDEX "pages_blocks_media_block_order_idx" ON "pages_blocks_media_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_media_block_parent_id_idx" ON "pages_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_media_block_path_idx" ON "pages_blocks_media_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_media_block_media_idx" ON "pages_blocks_media_block" USING btree ("media_id");
  CREATE INDEX "pages_blocks_metrics_bar_items_order_idx" ON "pages_blocks_metrics_bar_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_metrics_bar_items_parent_id_idx" ON "pages_blocks_metrics_bar_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_metrics_bar_order_idx" ON "pages_blocks_metrics_bar" USING btree ("_order");
  CREATE INDEX "pages_blocks_metrics_bar_parent_id_idx" ON "pages_blocks_metrics_bar" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_metrics_bar_path_idx" ON "pages_blocks_metrics_bar" USING btree ("_path");
  CREATE INDEX "pages_blocks_metrics_bar_content_image_idx" ON "pages_blocks_metrics_bar" USING btree ("content_image_id");
  CREATE INDEX "pages_blocks_notice_order_idx" ON "pages_blocks_notice" USING btree ("_order");
  CREATE INDEX "pages_blocks_notice_parent_id_idx" ON "pages_blocks_notice" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_notice_path_idx" ON "pages_blocks_notice" USING btree ("_path");
  CREATE INDEX "pages_blocks_portfolio_cards_projects_order_idx" ON "pages_blocks_portfolio_cards_projects" USING btree ("_order");
  CREATE INDEX "pages_blocks_portfolio_cards_projects_parent_id_idx" ON "pages_blocks_portfolio_cards_projects" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_portfolio_cards_order_idx" ON "pages_blocks_portfolio_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_portfolio_cards_parent_id_idx" ON "pages_blocks_portfolio_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_portfolio_cards_path_idx" ON "pages_blocks_portfolio_cards" USING btree ("_path");
  CREATE INDEX "pages_blocks_services_block_order_idx" ON "pages_blocks_services_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_block_parent_id_idx" ON "pages_blocks_services_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_block_path_idx" ON "pages_blocks_services_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_split1x2_order_idx" ON "pages_blocks_split1x2" USING btree ("_order");
  CREATE INDEX "pages_blocks_split1x2_parent_id_idx" ON "pages_blocks_split1x2" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_split1x2_path_idx" ON "pages_blocks_split1x2" USING btree ("_path");
  CREATE INDEX "pages_blocks_split1x2_small_column_image_idx" ON "pages_blocks_split1x2" USING btree ("small_column_image_id");
  CREATE INDEX "pages_blocks_split_section_order_idx" ON "pages_blocks_split_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_split_section_parent_id_idx" ON "pages_blocks_split_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_split_section_path_idx" ON "pages_blocks_split_section" USING btree ("_path");
  CREATE INDEX "pages_blocks_split_section_image_idx" ON "pages_blocks_split_section" USING btree ("image_id");
  CREATE INDEX "pages_blocks_tabs_tabs_order_idx" ON "pages_blocks_tabs_tabs" USING btree ("_order");
  CREATE INDEX "pages_blocks_tabs_tabs_parent_id_idx" ON "pages_blocks_tabs_tabs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_tabs_tabs_tab_image_idx" ON "pages_blocks_tabs_tabs" USING btree ("tab_image_id");
  CREATE INDEX "pages_blocks_tabs_order_idx" ON "pages_blocks_tabs" USING btree ("_order");
  CREATE INDEX "pages_blocks_tabs_parent_id_idx" ON "pages_blocks_tabs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_tabs_path_idx" ON "pages_blocks_tabs" USING btree ("_path");
  CREATE INDEX "pages_blocks_thesis_stats_stats_order_idx" ON "pages_blocks_thesis_stats_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_thesis_stats_stats_parent_id_idx" ON "pages_blocks_thesis_stats_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_thesis_stats_order_idx" ON "pages_blocks_thesis_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_thesis_stats_parent_id_idx" ON "pages_blocks_thesis_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_thesis_stats_path_idx" ON "pages_blocks_thesis_stats" USING btree ("_path");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages" USING btree ("meta_image_id");
  CREATE INDEX "pages_meta_meta_og_image_idx" ON "pages" USING btree ("meta_og_image_id");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_pages_id_idx" ON "pages_rels" USING btree ("pages_id");
  CREATE INDEX "pages_rels_posts_id_idx" ON "pages_rels" USING btree ("posts_id");
  CREATE INDEX "pages_rels_domains_id_idx" ON "pages_rels" USING btree ("domains_id");
  CREATE INDEX "pages_rels_services_id_idx" ON "pages_rels" USING btree ("services_id");
  CREATE INDEX "pages_rels_videos_id_idx" ON "pages_rels" USING btree ("videos_id");
  CREATE INDEX "pages_rels_portfolios_id_idx" ON "pages_rels" USING btree ("portfolios_id");
  CREATE INDEX "pages_rels_articles_id_idx" ON "pages_rels" USING btree ("articles_id");
  CREATE INDEX "pages_rels_categories_id_idx" ON "pages_rels" USING btree ("categories_id");
  CREATE INDEX "pages_rels_domain_category_id_idx" ON "pages_rels" USING btree ("domain_category_id");
  CREATE INDEX "_pages_v_blocks_accordion_items_order_idx" ON "_pages_v_blocks_accordion_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_accordion_items_parent_id_idx" ON "_pages_v_blocks_accordion_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_accordion_order_idx" ON "_pages_v_blocks_accordion" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_accordion_parent_id_idx" ON "_pages_v_blocks_accordion" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_accordion_path_idx" ON "_pages_v_blocks_accordion" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_action_card_grid_cards_order_idx" ON "_pages_v_blocks_action_card_grid_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_action_card_grid_cards_parent_id_idx" ON "_pages_v_blocks_action_card_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_action_card_grid_cards_image_idx" ON "_pages_v_blocks_action_card_grid_cards" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_action_card_grid_order_idx" ON "_pages_v_blocks_action_card_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_action_card_grid_parent_id_idx" ON "_pages_v_blocks_action_card_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_action_card_grid_path_idx" ON "_pages_v_blocks_action_card_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_archive_order_idx" ON "_pages_v_blocks_archive" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_archive_parent_id_idx" ON "_pages_v_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_archive_path_idx" ON "_pages_v_blocks_archive" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_links_order_idx" ON "_pages_v_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_links_parent_id_idx" ON "_pages_v_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_order_idx" ON "_pages_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_parent_id_idx" ON "_pages_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_path_idx" ON "_pages_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_capabilities_grid_items_order_idx" ON "_pages_v_blocks_capabilities_grid_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_capabilities_grid_items_parent_id_idx" ON "_pages_v_blocks_capabilities_grid_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_capabilities_grid_order_idx" ON "_pages_v_blocks_capabilities_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_capabilities_grid_parent_id_idx" ON "_pages_v_blocks_capabilities_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_capabilities_grid_path_idx" ON "_pages_v_blocks_capabilities_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_centered_content_order_idx" ON "_pages_v_blocks_centered_content" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_centered_content_parent_id_idx" ON "_pages_v_blocks_centered_content" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_centered_content_path_idx" ON "_pages_v_blocks_centered_content" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_client_logos_clients_order_idx" ON "_pages_v_blocks_client_logos_clients" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_client_logos_clients_parent_id_idx" ON "_pages_v_blocks_client_logos_clients" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_client_logos_clients_logo_idx" ON "_pages_v_blocks_client_logos_clients" USING btree ("logo_id");
  CREATE INDEX "_pages_v_blocks_client_logos_order_idx" ON "_pages_v_blocks_client_logos" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_client_logos_parent_id_idx" ON "_pages_v_blocks_client_logos" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_client_logos_path_idx" ON "_pages_v_blocks_client_logos" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_company_facts_facts_order_idx" ON "_pages_v_blocks_company_facts_facts" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_company_facts_facts_parent_id_idx" ON "_pages_v_blocks_company_facts_facts" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_company_facts_order_idx" ON "_pages_v_blocks_company_facts" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_company_facts_parent_id_idx" ON "_pages_v_blocks_company_facts" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_company_facts_path_idx" ON "_pages_v_blocks_company_facts" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_info_order_idx" ON "_pages_v_blocks_contact_info" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_info_parent_id_idx" ON "_pages_v_blocks_contact_info" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_info_path_idx" ON "_pages_v_blocks_contact_info" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_code_order_idx" ON "_pages_v_blocks_code" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_code_parent_id_idx" ON "_pages_v_blocks_code" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_code_path_idx" ON "_pages_v_blocks_code" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_content_columns_order_idx" ON "_pages_v_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_content_columns_parent_id_idx" ON "_pages_v_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_content_order_idx" ON "_pages_v_blocks_content" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_content_parent_id_idx" ON "_pages_v_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_content_path_idx" ON "_pages_v_blocks_content" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_domain_showcase_order_idx" ON "_pages_v_blocks_domain_showcase" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_domain_showcase_parent_id_idx" ON "_pages_v_blocks_domain_showcase" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_domain_showcase_path_idx" ON "_pages_v_blocks_domain_showcase" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_form_block_order_idx" ON "_pages_v_blocks_form_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_form_block_parent_id_idx" ON "_pages_v_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_form_block_path_idx" ON "_pages_v_blocks_form_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_form_block_form_idx" ON "_pages_v_blocks_form_block" USING btree ("form_id");
  CREATE INDEX "_pages_v_blocks_hero_carousel_slides_order_idx" ON "_pages_v_blocks_hero_carousel_slides" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_carousel_slides_parent_id_idx" ON "_pages_v_blocks_hero_carousel_slides" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_carousel_slides_image_idx" ON "_pages_v_blocks_hero_carousel_slides" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_hero_carousel_order_idx" ON "_pages_v_blocks_hero_carousel" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_carousel_parent_id_idx" ON "_pages_v_blocks_hero_carousel" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_carousel_path_idx" ON "_pages_v_blocks_hero_carousel" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_header_slides_order_idx" ON "_pages_v_blocks_hero_header_slides" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_header_slides_parent_id_idx" ON "_pages_v_blocks_hero_header_slides" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_header_slides_image_idx" ON "_pages_v_blocks_hero_header_slides" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_hero_header_order_idx" ON "_pages_v_blocks_hero_header" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_header_parent_id_idx" ON "_pages_v_blocks_hero_header" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_header_path_idx" ON "_pages_v_blocks_hero_header" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_header_image_idx" ON "_pages_v_blocks_hero_header" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_image_gallery_images_order_idx" ON "_pages_v_blocks_image_gallery_images" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_image_gallery_images_parent_id_idx" ON "_pages_v_blocks_image_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_image_gallery_images_image_idx" ON "_pages_v_blocks_image_gallery_images" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_image_gallery_order_idx" ON "_pages_v_blocks_image_gallery" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_image_gallery_parent_id_idx" ON "_pages_v_blocks_image_gallery" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_image_gallery_path_idx" ON "_pages_v_blocks_image_gallery" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_media_block_order_idx" ON "_pages_v_blocks_media_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_media_block_parent_id_idx" ON "_pages_v_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_media_block_path_idx" ON "_pages_v_blocks_media_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_media_block_media_idx" ON "_pages_v_blocks_media_block" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_metrics_bar_items_order_idx" ON "_pages_v_blocks_metrics_bar_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_metrics_bar_items_parent_id_idx" ON "_pages_v_blocks_metrics_bar_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_metrics_bar_order_idx" ON "_pages_v_blocks_metrics_bar" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_metrics_bar_parent_id_idx" ON "_pages_v_blocks_metrics_bar" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_metrics_bar_path_idx" ON "_pages_v_blocks_metrics_bar" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_metrics_bar_content_image_idx" ON "_pages_v_blocks_metrics_bar" USING btree ("content_image_id");
  CREATE INDEX "_pages_v_blocks_notice_order_idx" ON "_pages_v_blocks_notice" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_notice_parent_id_idx" ON "_pages_v_blocks_notice" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_notice_path_idx" ON "_pages_v_blocks_notice" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_portfolio_cards_projects_order_idx" ON "_pages_v_blocks_portfolio_cards_projects" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_portfolio_cards_projects_parent_id_idx" ON "_pages_v_blocks_portfolio_cards_projects" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_portfolio_cards_order_idx" ON "_pages_v_blocks_portfolio_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_portfolio_cards_parent_id_idx" ON "_pages_v_blocks_portfolio_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_portfolio_cards_path_idx" ON "_pages_v_blocks_portfolio_cards" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_services_block_order_idx" ON "_pages_v_blocks_services_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_services_block_parent_id_idx" ON "_pages_v_blocks_services_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_services_block_path_idx" ON "_pages_v_blocks_services_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_split1x2_order_idx" ON "_pages_v_blocks_split1x2" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_split1x2_parent_id_idx" ON "_pages_v_blocks_split1x2" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_split1x2_path_idx" ON "_pages_v_blocks_split1x2" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_split1x2_small_column_image_idx" ON "_pages_v_blocks_split1x2" USING btree ("small_column_image_id");
  CREATE INDEX "_pages_v_blocks_split_section_order_idx" ON "_pages_v_blocks_split_section" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_split_section_parent_id_idx" ON "_pages_v_blocks_split_section" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_split_section_path_idx" ON "_pages_v_blocks_split_section" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_split_section_image_idx" ON "_pages_v_blocks_split_section" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_tabs_tabs_order_idx" ON "_pages_v_blocks_tabs_tabs" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_tabs_tabs_parent_id_idx" ON "_pages_v_blocks_tabs_tabs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_tabs_tabs_tab_image_idx" ON "_pages_v_blocks_tabs_tabs" USING btree ("tab_image_id");
  CREATE INDEX "_pages_v_blocks_tabs_order_idx" ON "_pages_v_blocks_tabs" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_tabs_parent_id_idx" ON "_pages_v_blocks_tabs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_tabs_path_idx" ON "_pages_v_blocks_tabs" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_thesis_stats_stats_order_idx" ON "_pages_v_blocks_thesis_stats_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_thesis_stats_stats_parent_id_idx" ON "_pages_v_blocks_thesis_stats_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_thesis_stats_order_idx" ON "_pages_v_blocks_thesis_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_thesis_stats_parent_id_idx" ON "_pages_v_blocks_thesis_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_thesis_stats_path_idx" ON "_pages_v_blocks_thesis_stats" USING btree ("_path");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_meta_version_meta_image_idx" ON "_pages_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_pages_v_version_meta_version_meta_og_image_idx" ON "_pages_v" USING btree ("version_meta_og_image_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_pages_id_idx" ON "_pages_v_rels" USING btree ("pages_id");
  CREATE INDEX "_pages_v_rels_posts_id_idx" ON "_pages_v_rels" USING btree ("posts_id");
  CREATE INDEX "_pages_v_rels_domains_id_idx" ON "_pages_v_rels" USING btree ("domains_id");
  CREATE INDEX "_pages_v_rels_services_id_idx" ON "_pages_v_rels" USING btree ("services_id");
  CREATE INDEX "_pages_v_rels_videos_id_idx" ON "_pages_v_rels" USING btree ("videos_id");
  CREATE INDEX "_pages_v_rels_portfolios_id_idx" ON "_pages_v_rels" USING btree ("portfolios_id");
  CREATE INDEX "_pages_v_rels_articles_id_idx" ON "_pages_v_rels" USING btree ("articles_id");
  CREATE INDEX "_pages_v_rels_categories_id_idx" ON "_pages_v_rels" USING btree ("categories_id");
  CREATE INDEX "_pages_v_rels_domain_category_id_idx" ON "_pages_v_rels" USING btree ("domain_category_id");
  CREATE INDEX "posts_takeaways_order_idx" ON "posts_takeaways" USING btree ("_order");
  CREATE INDEX "posts_takeaways_parent_id_idx" ON "posts_takeaways" USING btree ("_parent_id");
  CREATE INDEX "posts_tags_order_idx" ON "posts_tags" USING btree ("_order");
  CREATE INDEX "posts_tags_parent_id_idx" ON "posts_tags" USING btree ("_parent_id");
  CREATE INDEX "posts_populated_authors_order_idx" ON "posts_populated_authors" USING btree ("_order");
  CREATE INDEX "posts_populated_authors_parent_id_idx" ON "posts_populated_authors" USING btree ("_parent_id");
  CREATE INDEX "posts_hero_image_idx" ON "posts" USING btree ("hero_image_id");
  CREATE INDEX "posts_meta_meta_image_idx" ON "posts" USING btree ("meta_image_id");
  CREATE INDEX "posts_meta_meta_og_image_idx" ON "posts" USING btree ("meta_og_image_id");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX "posts__status_idx" ON "posts" USING btree ("_status");
  CREATE INDEX "posts_rels_order_idx" ON "posts_rels" USING btree ("order");
  CREATE INDEX "posts_rels_parent_idx" ON "posts_rels" USING btree ("parent_id");
  CREATE INDEX "posts_rels_path_idx" ON "posts_rels" USING btree ("path");
  CREATE INDEX "posts_rels_posts_id_idx" ON "posts_rels" USING btree ("posts_id");
  CREATE INDEX "posts_rels_categories_id_idx" ON "posts_rels" USING btree ("categories_id");
  CREATE INDEX "posts_rels_users_id_idx" ON "posts_rels" USING btree ("users_id");
  CREATE INDEX "_posts_v_version_takeaways_order_idx" ON "_posts_v_version_takeaways" USING btree ("_order");
  CREATE INDEX "_posts_v_version_takeaways_parent_id_idx" ON "_posts_v_version_takeaways" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_version_tags_order_idx" ON "_posts_v_version_tags" USING btree ("_order");
  CREATE INDEX "_posts_v_version_tags_parent_id_idx" ON "_posts_v_version_tags" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_version_populated_authors_order_idx" ON "_posts_v_version_populated_authors" USING btree ("_order");
  CREATE INDEX "_posts_v_version_populated_authors_parent_id_idx" ON "_posts_v_version_populated_authors" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_parent_idx" ON "_posts_v" USING btree ("parent_id");
  CREATE INDEX "_posts_v_version_version_hero_image_idx" ON "_posts_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_posts_v_version_meta_version_meta_image_idx" ON "_posts_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_posts_v_version_meta_version_meta_og_image_idx" ON "_posts_v" USING btree ("version_meta_og_image_id");
  CREATE INDEX "_posts_v_version_version_slug_idx" ON "_posts_v" USING btree ("version_slug");
  CREATE INDEX "_posts_v_version_version_updated_at_idx" ON "_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
  CREATE INDEX "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
  CREATE INDEX "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
  CREATE INDEX "_posts_v_autosave_idx" ON "_posts_v" USING btree ("autosave");
  CREATE INDEX "_posts_v_rels_order_idx" ON "_posts_v_rels" USING btree ("order");
  CREATE INDEX "_posts_v_rels_parent_idx" ON "_posts_v_rels" USING btree ("parent_id");
  CREATE INDEX "_posts_v_rels_path_idx" ON "_posts_v_rels" USING btree ("path");
  CREATE INDEX "_posts_v_rels_posts_id_idx" ON "_posts_v_rels" USING btree ("posts_id");
  CREATE INDEX "_posts_v_rels_categories_id_idx" ON "_posts_v_rels" USING btree ("categories_id");
  CREATE INDEX "_posts_v_rels_users_id_idx" ON "_posts_v_rels" USING btree ("users_id");
  CREATE INDEX "domains_rich_summary_bullets_order_idx" ON "domains_rich_summary_bullets" USING btree ("_order");
  CREATE INDEX "domains_rich_summary_bullets_parent_id_idx" ON "domains_rich_summary_bullets" USING btree ("_parent_id");
  CREATE INDEX "domains_use_cases_order_idx" ON "domains_use_cases" USING btree ("_order");
  CREATE INDEX "domains_use_cases_parent_id_idx" ON "domains_use_cases" USING btree ("_parent_id");
  CREATE INDEX "domains_featured_image_idx" ON "domains" USING btree ("featured_image_id");
  CREATE INDEX "domains_category_idx" ON "domains" USING btree ("category_id");
  CREATE INDEX "domains_meta_meta_image_idx" ON "domains" USING btree ("meta_image_id");
  CREATE INDEX "domains_meta_meta_og_image_idx" ON "domains" USING btree ("meta_og_image_id");
  CREATE INDEX "domains_slug_idx" ON "domains" USING btree ("slug");
  CREATE INDEX "domains_updated_at_idx" ON "domains" USING btree ("updated_at");
  CREATE INDEX "domains_created_at_idx" ON "domains" USING btree ("created_at");
  CREATE INDEX "domains__status_idx" ON "domains" USING btree ("_status");
  CREATE INDEX "_domains_v_version_rich_summary_bullets_order_idx" ON "_domains_v_version_rich_summary_bullets" USING btree ("_order");
  CREATE INDEX "_domains_v_version_rich_summary_bullets_parent_id_idx" ON "_domains_v_version_rich_summary_bullets" USING btree ("_parent_id");
  CREATE INDEX "_domains_v_version_use_cases_order_idx" ON "_domains_v_version_use_cases" USING btree ("_order");
  CREATE INDEX "_domains_v_version_use_cases_parent_id_idx" ON "_domains_v_version_use_cases" USING btree ("_parent_id");
  CREATE INDEX "_domains_v_parent_idx" ON "_domains_v" USING btree ("parent_id");
  CREATE INDEX "_domains_v_version_version_featured_image_idx" ON "_domains_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_domains_v_version_version_category_idx" ON "_domains_v" USING btree ("version_category_id");
  CREATE INDEX "_domains_v_version_meta_version_meta_image_idx" ON "_domains_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_domains_v_version_meta_version_meta_og_image_idx" ON "_domains_v" USING btree ("version_meta_og_image_id");
  CREATE INDEX "_domains_v_version_version_slug_idx" ON "_domains_v" USING btree ("version_slug");
  CREATE INDEX "_domains_v_version_version_updated_at_idx" ON "_domains_v" USING btree ("version_updated_at");
  CREATE INDEX "_domains_v_version_version_created_at_idx" ON "_domains_v" USING btree ("version_created_at");
  CREATE INDEX "_domains_v_version_version__status_idx" ON "_domains_v" USING btree ("version__status");
  CREATE INDEX "_domains_v_created_at_idx" ON "_domains_v" USING btree ("created_at");
  CREATE INDEX "_domains_v_updated_at_idx" ON "_domains_v" USING btree ("updated_at");
  CREATE INDEX "_domains_v_latest_idx" ON "_domains_v" USING btree ("latest");
  CREATE INDEX "_domains_v_autosave_idx" ON "_domains_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "domain_sets_slug_idx" ON "domain_sets" USING btree ("slug");
  CREATE INDEX "domain_sets_updated_at_idx" ON "domain_sets" USING btree ("updated_at");
  CREATE INDEX "domain_sets_created_at_idx" ON "domain_sets" USING btree ("created_at");
  CREATE INDEX "domain_sets_rels_order_idx" ON "domain_sets_rels" USING btree ("order");
  CREATE INDEX "domain_sets_rels_parent_idx" ON "domain_sets_rels" USING btree ("parent_id");
  CREATE INDEX "domain_sets_rels_path_idx" ON "domain_sets_rels" USING btree ("path");
  CREATE INDEX "domain_sets_rels_domains_id_idx" ON "domain_sets_rels" USING btree ("domains_id");
  CREATE INDEX "domain_inquiries_domain_idx" ON "domain_inquiries" USING btree ("domain_id");
  CREATE INDEX "domain_inquiries_updated_at_idx" ON "domain_inquiries" USING btree ("updated_at");
  CREATE INDEX "domain_inquiries_created_at_idx" ON "domain_inquiries" USING btree ("created_at");
  CREATE INDEX "domain_category_updated_at_idx" ON "domain_category" USING btree ("updated_at");
  CREATE INDEX "domain_category_created_at_idx" ON "domain_category" USING btree ("created_at");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_square_sizes_square_filename_idx" ON "media" USING btree ("sizes_square_filename");
  CREATE INDEX "media_sizes_small_sizes_small_filename_idx" ON "media" USING btree ("sizes_small_filename");
  CREATE INDEX "media_sizes_medium_sizes_medium_filename_idx" ON "media" USING btree ("sizes_medium_filename");
  CREATE INDEX "media_sizes_large_sizes_large_filename_idx" ON "media" USING btree ("sizes_large_filename");
  CREATE INDEX "media_sizes_xlarge_sizes_xlarge_filename_idx" ON "media" USING btree ("sizes_xlarge_filename");
  CREATE INDEX "media_sizes_og_sizes_og_filename_idx" ON "media" USING btree ("sizes_og_filename");
  CREATE INDEX "categories_breadcrumbs_order_idx" ON "categories_breadcrumbs" USING btree ("_order");
  CREATE INDEX "categories_breadcrumbs_parent_id_idx" ON "categories_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX "categories_breadcrumbs_doc_idx" ON "categories_breadcrumbs" USING btree ("doc_id");
  CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX "categories_parent_idx" ON "categories" USING btree ("parent_id");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "services_deliverables_order_idx" ON "services_deliverables" USING btree ("_order");
  CREATE INDEX "services_deliverables_parent_id_idx" ON "services_deliverables" USING btree ("_parent_id");
  CREATE INDEX "services_authority_section_items_order_idx" ON "services_authority_section_items" USING btree ("_order");
  CREATE INDEX "services_authority_section_items_parent_id_idx" ON "services_authority_section_items" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_accordion_items_order_idx" ON "services_blocks_accordion_items" USING btree ("_order");
  CREATE INDEX "services_blocks_accordion_items_parent_id_idx" ON "services_blocks_accordion_items" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_accordion_order_idx" ON "services_blocks_accordion" USING btree ("_order");
  CREATE INDEX "services_blocks_accordion_parent_id_idx" ON "services_blocks_accordion" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_accordion_path_idx" ON "services_blocks_accordion" USING btree ("_path");
  CREATE INDEX "services_blocks_action_card_grid_cards_order_idx" ON "services_blocks_action_card_grid_cards" USING btree ("_order");
  CREATE INDEX "services_blocks_action_card_grid_cards_parent_id_idx" ON "services_blocks_action_card_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_action_card_grid_cards_image_idx" ON "services_blocks_action_card_grid_cards" USING btree ("image_id");
  CREATE INDEX "services_blocks_action_card_grid_order_idx" ON "services_blocks_action_card_grid" USING btree ("_order");
  CREATE INDEX "services_blocks_action_card_grid_parent_id_idx" ON "services_blocks_action_card_grid" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_action_card_grid_path_idx" ON "services_blocks_action_card_grid" USING btree ("_path");
  CREATE INDEX "services_blocks_cta_links_order_idx" ON "services_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "services_blocks_cta_links_parent_id_idx" ON "services_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_cta_order_idx" ON "services_blocks_cta" USING btree ("_order");
  CREATE INDEX "services_blocks_cta_parent_id_idx" ON "services_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_cta_path_idx" ON "services_blocks_cta" USING btree ("_path");
  CREATE INDEX "services_blocks_centered_content_order_idx" ON "services_blocks_centered_content" USING btree ("_order");
  CREATE INDEX "services_blocks_centered_content_parent_id_idx" ON "services_blocks_centered_content" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_centered_content_path_idx" ON "services_blocks_centered_content" USING btree ("_path");
  CREATE INDEX "services_blocks_content_columns_order_idx" ON "services_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "services_blocks_content_columns_parent_id_idx" ON "services_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_content_order_idx" ON "services_blocks_content" USING btree ("_order");
  CREATE INDEX "services_blocks_content_parent_id_idx" ON "services_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_content_path_idx" ON "services_blocks_content" USING btree ("_path");
  CREATE INDEX "services_blocks_hero_carousel_slides_order_idx" ON "services_blocks_hero_carousel_slides" USING btree ("_order");
  CREATE INDEX "services_blocks_hero_carousel_slides_parent_id_idx" ON "services_blocks_hero_carousel_slides" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_hero_carousel_slides_image_idx" ON "services_blocks_hero_carousel_slides" USING btree ("image_id");
  CREATE INDEX "services_blocks_hero_carousel_order_idx" ON "services_blocks_hero_carousel" USING btree ("_order");
  CREATE INDEX "services_blocks_hero_carousel_parent_id_idx" ON "services_blocks_hero_carousel" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_hero_carousel_path_idx" ON "services_blocks_hero_carousel" USING btree ("_path");
  CREATE INDEX "services_blocks_image_gallery_images_order_idx" ON "services_blocks_image_gallery_images" USING btree ("_order");
  CREATE INDEX "services_blocks_image_gallery_images_parent_id_idx" ON "services_blocks_image_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_image_gallery_images_image_idx" ON "services_blocks_image_gallery_images" USING btree ("image_id");
  CREATE INDEX "services_blocks_image_gallery_order_idx" ON "services_blocks_image_gallery" USING btree ("_order");
  CREATE INDEX "services_blocks_image_gallery_parent_id_idx" ON "services_blocks_image_gallery" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_image_gallery_path_idx" ON "services_blocks_image_gallery" USING btree ("_path");
  CREATE INDEX "services_blocks_metrics_bar_items_order_idx" ON "services_blocks_metrics_bar_items" USING btree ("_order");
  CREATE INDEX "services_blocks_metrics_bar_items_parent_id_idx" ON "services_blocks_metrics_bar_items" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_metrics_bar_order_idx" ON "services_blocks_metrics_bar" USING btree ("_order");
  CREATE INDEX "services_blocks_metrics_bar_parent_id_idx" ON "services_blocks_metrics_bar" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_metrics_bar_path_idx" ON "services_blocks_metrics_bar" USING btree ("_path");
  CREATE INDEX "services_blocks_metrics_bar_content_image_idx" ON "services_blocks_metrics_bar" USING btree ("content_image_id");
  CREATE INDEX "services_blocks_notice_order_idx" ON "services_blocks_notice" USING btree ("_order");
  CREATE INDEX "services_blocks_notice_parent_id_idx" ON "services_blocks_notice" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_notice_path_idx" ON "services_blocks_notice" USING btree ("_path");
  CREATE INDEX "services_blocks_split1x2_order_idx" ON "services_blocks_split1x2" USING btree ("_order");
  CREATE INDEX "services_blocks_split1x2_parent_id_idx" ON "services_blocks_split1x2" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_split1x2_path_idx" ON "services_blocks_split1x2" USING btree ("_path");
  CREATE INDEX "services_blocks_split1x2_small_column_image_idx" ON "services_blocks_split1x2" USING btree ("small_column_image_id");
  CREATE INDEX "services_blocks_split_section_order_idx" ON "services_blocks_split_section" USING btree ("_order");
  CREATE INDEX "services_blocks_split_section_parent_id_idx" ON "services_blocks_split_section" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_split_section_path_idx" ON "services_blocks_split_section" USING btree ("_path");
  CREATE INDEX "services_blocks_split_section_image_idx" ON "services_blocks_split_section" USING btree ("image_id");
  CREATE INDEX "services_blocks_tabs_tabs_order_idx" ON "services_blocks_tabs_tabs" USING btree ("_order");
  CREATE INDEX "services_blocks_tabs_tabs_parent_id_idx" ON "services_blocks_tabs_tabs" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_tabs_tabs_tab_image_idx" ON "services_blocks_tabs_tabs" USING btree ("tab_image_id");
  CREATE INDEX "services_blocks_tabs_order_idx" ON "services_blocks_tabs" USING btree ("_order");
  CREATE INDEX "services_blocks_tabs_parent_id_idx" ON "services_blocks_tabs" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_tabs_path_idx" ON "services_blocks_tabs" USING btree ("_path");
  CREATE INDEX "services_sort_order_idx" ON "services" USING btree ("sort_order");
  CREATE UNIQUE INDEX "services_slug_idx" ON "services" USING btree ("slug");
  CREATE INDEX "services_category_idx" ON "services" USING btree ("category_id");
  CREATE INDEX "services_featured_image_idx" ON "services" USING btree ("featured_image_id");
  CREATE INDEX "services_meta_meta_image_idx" ON "services" USING btree ("meta_image_id");
  CREATE INDEX "services_meta_meta_og_image_idx" ON "services" USING btree ("meta_og_image_id");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE INDEX "services_rels_order_idx" ON "services_rels" USING btree ("order");
  CREATE INDEX "services_rels_parent_idx" ON "services_rels" USING btree ("parent_id");
  CREATE INDEX "services_rels_path_idx" ON "services_rels" USING btree ("path");
  CREATE INDEX "services_rels_pages_id_idx" ON "services_rels" USING btree ("pages_id");
  CREATE INDEX "services_rels_posts_id_idx" ON "services_rels" USING btree ("posts_id");
  CREATE INDEX "services_rels_domains_id_idx" ON "services_rels" USING btree ("domains_id");
  CREATE INDEX "services_rels_services_id_idx" ON "services_rels" USING btree ("services_id");
  CREATE INDEX "services_rels_videos_id_idx" ON "services_rels" USING btree ("videos_id");
  CREATE INDEX "services_rels_portfolios_id_idx" ON "services_rels" USING btree ("portfolios_id");
  CREATE INDEX "services_rels_articles_id_idx" ON "services_rels" USING btree ("articles_id");
  CREATE UNIQUE INDEX "service_categories_slug_idx" ON "service_categories" USING btree ("slug");
  CREATE INDEX "service_categories_updated_at_idx" ON "service_categories" USING btree ("updated_at");
  CREATE INDEX "service_categories_created_at_idx" ON "service_categories" USING btree ("created_at");
  CREATE INDEX "videos_tags_order_idx" ON "videos_tags" USING btree ("_order");
  CREATE INDEX "videos_tags_parent_id_idx" ON "videos_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "videos_slug_idx" ON "videos" USING btree ("slug");
  CREATE INDEX "videos_thumbnail_idx" ON "videos" USING btree ("thumbnail_id");
  CREATE INDEX "videos_meta_meta_image_idx" ON "videos" USING btree ("meta_image_id");
  CREATE INDEX "videos_meta_meta_og_image_idx" ON "videos" USING btree ("meta_og_image_id");
  CREATE INDEX "videos_updated_at_idx" ON "videos" USING btree ("updated_at");
  CREATE INDEX "videos_created_at_idx" ON "videos" USING btree ("created_at");
  CREATE INDEX "videos__status_idx" ON "videos" USING btree ("_status");
  CREATE INDEX "videos_rels_order_idx" ON "videos_rels" USING btree ("order");
  CREATE INDEX "videos_rels_parent_idx" ON "videos_rels" USING btree ("parent_id");
  CREATE INDEX "videos_rels_path_idx" ON "videos_rels" USING btree ("path");
  CREATE INDEX "videos_rels_video_categories_id_idx" ON "videos_rels" USING btree ("video_categories_id");
  CREATE INDEX "_videos_v_version_tags_order_idx" ON "_videos_v_version_tags" USING btree ("_order");
  CREATE INDEX "_videos_v_version_tags_parent_id_idx" ON "_videos_v_version_tags" USING btree ("_parent_id");
  CREATE INDEX "_videos_v_parent_idx" ON "_videos_v" USING btree ("parent_id");
  CREATE INDEX "_videos_v_version_version_slug_idx" ON "_videos_v" USING btree ("version_slug");
  CREATE INDEX "_videos_v_version_version_thumbnail_idx" ON "_videos_v" USING btree ("version_thumbnail_id");
  CREATE INDEX "_videos_v_version_meta_version_meta_image_idx" ON "_videos_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_videos_v_version_meta_version_meta_og_image_idx" ON "_videos_v" USING btree ("version_meta_og_image_id");
  CREATE INDEX "_videos_v_version_version_updated_at_idx" ON "_videos_v" USING btree ("version_updated_at");
  CREATE INDEX "_videos_v_version_version_created_at_idx" ON "_videos_v" USING btree ("version_created_at");
  CREATE INDEX "_videos_v_version_version__status_idx" ON "_videos_v" USING btree ("version__status");
  CREATE INDEX "_videos_v_created_at_idx" ON "_videos_v" USING btree ("created_at");
  CREATE INDEX "_videos_v_updated_at_idx" ON "_videos_v" USING btree ("updated_at");
  CREATE INDEX "_videos_v_latest_idx" ON "_videos_v" USING btree ("latest");
  CREATE INDEX "_videos_v_autosave_idx" ON "_videos_v" USING btree ("autosave");
  CREATE INDEX "_videos_v_rels_order_idx" ON "_videos_v_rels" USING btree ("order");
  CREATE INDEX "_videos_v_rels_parent_idx" ON "_videos_v_rels" USING btree ("parent_id");
  CREATE INDEX "_videos_v_rels_path_idx" ON "_videos_v_rels" USING btree ("path");
  CREATE INDEX "_videos_v_rels_video_categories_id_idx" ON "_videos_v_rels" USING btree ("video_categories_id");
  CREATE UNIQUE INDEX "video_categories_slug_idx" ON "video_categories" USING btree ("slug");
  CREATE INDEX "video_categories_updated_at_idx" ON "video_categories" USING btree ("updated_at");
  CREATE INDEX "video_categories_created_at_idx" ON "video_categories" USING btree ("created_at");
  CREATE INDEX "portfolios_gallery_order_idx" ON "portfolios_gallery" USING btree ("_order");
  CREATE INDEX "portfolios_gallery_parent_id_idx" ON "portfolios_gallery" USING btree ("_parent_id");
  CREATE INDEX "portfolios_gallery_image_idx" ON "portfolios_gallery" USING btree ("image_id");
  CREATE INDEX "portfolios_technologies_order_idx" ON "portfolios_technologies" USING btree ("_order");
  CREATE INDEX "portfolios_technologies_parent_id_idx" ON "portfolios_technologies" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "portfolios_slug_idx" ON "portfolios" USING btree ("slug");
  CREATE INDEX "portfolios_featured_image_idx" ON "portfolios" USING btree ("featured_image_id");
  CREATE INDEX "portfolios_meta_meta_image_idx" ON "portfolios" USING btree ("meta_image_id");
  CREATE INDEX "portfolios_meta_meta_og_image_idx" ON "portfolios" USING btree ("meta_og_image_id");
  CREATE INDEX "portfolios_updated_at_idx" ON "portfolios" USING btree ("updated_at");
  CREATE INDEX "portfolios_created_at_idx" ON "portfolios" USING btree ("created_at");
  CREATE INDEX "portfolios__status_idx" ON "portfolios" USING btree ("_status");
  CREATE INDEX "portfolios_rels_order_idx" ON "portfolios_rels" USING btree ("order");
  CREATE INDEX "portfolios_rels_parent_idx" ON "portfolios_rels" USING btree ("parent_id");
  CREATE INDEX "portfolios_rels_path_idx" ON "portfolios_rels" USING btree ("path");
  CREATE INDEX "portfolios_rels_portfolio_categories_id_idx" ON "portfolios_rels" USING btree ("portfolio_categories_id");
  CREATE INDEX "_portfolios_v_version_gallery_order_idx" ON "_portfolios_v_version_gallery" USING btree ("_order");
  CREATE INDEX "_portfolios_v_version_gallery_parent_id_idx" ON "_portfolios_v_version_gallery" USING btree ("_parent_id");
  CREATE INDEX "_portfolios_v_version_gallery_image_idx" ON "_portfolios_v_version_gallery" USING btree ("image_id");
  CREATE INDEX "_portfolios_v_version_technologies_order_idx" ON "_portfolios_v_version_technologies" USING btree ("_order");
  CREATE INDEX "_portfolios_v_version_technologies_parent_id_idx" ON "_portfolios_v_version_technologies" USING btree ("_parent_id");
  CREATE INDEX "_portfolios_v_parent_idx" ON "_portfolios_v" USING btree ("parent_id");
  CREATE INDEX "_portfolios_v_version_version_slug_idx" ON "_portfolios_v" USING btree ("version_slug");
  CREATE INDEX "_portfolios_v_version_version_featured_image_idx" ON "_portfolios_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_portfolios_v_version_meta_version_meta_image_idx" ON "_portfolios_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_portfolios_v_version_meta_version_meta_og_image_idx" ON "_portfolios_v" USING btree ("version_meta_og_image_id");
  CREATE INDEX "_portfolios_v_version_version_updated_at_idx" ON "_portfolios_v" USING btree ("version_updated_at");
  CREATE INDEX "_portfolios_v_version_version_created_at_idx" ON "_portfolios_v" USING btree ("version_created_at");
  CREATE INDEX "_portfolios_v_version_version__status_idx" ON "_portfolios_v" USING btree ("version__status");
  CREATE INDEX "_portfolios_v_created_at_idx" ON "_portfolios_v" USING btree ("created_at");
  CREATE INDEX "_portfolios_v_updated_at_idx" ON "_portfolios_v" USING btree ("updated_at");
  CREATE INDEX "_portfolios_v_latest_idx" ON "_portfolios_v" USING btree ("latest");
  CREATE INDEX "_portfolios_v_autosave_idx" ON "_portfolios_v" USING btree ("autosave");
  CREATE INDEX "_portfolios_v_rels_order_idx" ON "_portfolios_v_rels" USING btree ("order");
  CREATE INDEX "_portfolios_v_rels_parent_idx" ON "_portfolios_v_rels" USING btree ("parent_id");
  CREATE INDEX "_portfolios_v_rels_path_idx" ON "_portfolios_v_rels" USING btree ("path");
  CREATE INDEX "_portfolios_v_rels_portfolio_categories_id_idx" ON "_portfolios_v_rels" USING btree ("portfolio_categories_id");
  CREATE UNIQUE INDEX "portfolio_categories_slug_idx" ON "portfolio_categories" USING btree ("slug");
  CREATE INDEX "portfolio_categories_updated_at_idx" ON "portfolio_categories" USING btree ("updated_at");
  CREATE INDEX "portfolio_categories_created_at_idx" ON "portfolio_categories" USING btree ("created_at");
  CREATE INDEX "articles_takeaways_order_idx" ON "articles_takeaways" USING btree ("_order");
  CREATE INDEX "articles_takeaways_parent_id_idx" ON "articles_takeaways" USING btree ("_parent_id");
  CREATE INDEX "articles_tags_order_idx" ON "articles_tags" USING btree ("_order");
  CREATE INDEX "articles_tags_parent_id_idx" ON "articles_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "articles_slug_idx" ON "articles" USING btree ("slug");
  CREATE INDEX "articles_featured_image_idx" ON "articles" USING btree ("featured_image_id");
  CREATE INDEX "articles_meta_meta_image_idx" ON "articles" USING btree ("meta_image_id");
  CREATE INDEX "articles_meta_meta_og_image_idx" ON "articles" USING btree ("meta_og_image_id");
  CREATE INDEX "articles_updated_at_idx" ON "articles" USING btree ("updated_at");
  CREATE INDEX "articles_created_at_idx" ON "articles" USING btree ("created_at");
  CREATE INDEX "articles__status_idx" ON "articles" USING btree ("_status");
  CREATE INDEX "articles_rels_order_idx" ON "articles_rels" USING btree ("order");
  CREATE INDEX "articles_rels_parent_idx" ON "articles_rels" USING btree ("parent_id");
  CREATE INDEX "articles_rels_path_idx" ON "articles_rels" USING btree ("path");
  CREATE INDEX "articles_rels_article_categories_id_idx" ON "articles_rels" USING btree ("article_categories_id");
  CREATE INDEX "_articles_v_version_takeaways_order_idx" ON "_articles_v_version_takeaways" USING btree ("_order");
  CREATE INDEX "_articles_v_version_takeaways_parent_id_idx" ON "_articles_v_version_takeaways" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_version_tags_order_idx" ON "_articles_v_version_tags" USING btree ("_order");
  CREATE INDEX "_articles_v_version_tags_parent_id_idx" ON "_articles_v_version_tags" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_parent_idx" ON "_articles_v" USING btree ("parent_id");
  CREATE INDEX "_articles_v_version_version_slug_idx" ON "_articles_v" USING btree ("version_slug");
  CREATE INDEX "_articles_v_version_version_featured_image_idx" ON "_articles_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_articles_v_version_meta_version_meta_image_idx" ON "_articles_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_articles_v_version_meta_version_meta_og_image_idx" ON "_articles_v" USING btree ("version_meta_og_image_id");
  CREATE INDEX "_articles_v_version_version_updated_at_idx" ON "_articles_v" USING btree ("version_updated_at");
  CREATE INDEX "_articles_v_version_version_created_at_idx" ON "_articles_v" USING btree ("version_created_at");
  CREATE INDEX "_articles_v_version_version__status_idx" ON "_articles_v" USING btree ("version__status");
  CREATE INDEX "_articles_v_created_at_idx" ON "_articles_v" USING btree ("created_at");
  CREATE INDEX "_articles_v_updated_at_idx" ON "_articles_v" USING btree ("updated_at");
  CREATE INDEX "_articles_v_latest_idx" ON "_articles_v" USING btree ("latest");
  CREATE INDEX "_articles_v_autosave_idx" ON "_articles_v" USING btree ("autosave");
  CREATE INDEX "_articles_v_rels_order_idx" ON "_articles_v_rels" USING btree ("order");
  CREATE INDEX "_articles_v_rels_parent_idx" ON "_articles_v_rels" USING btree ("parent_id");
  CREATE INDEX "_articles_v_rels_path_idx" ON "_articles_v_rels" USING btree ("path");
  CREATE INDEX "_articles_v_rels_article_categories_id_idx" ON "_articles_v_rels" USING btree ("article_categories_id");
  CREATE UNIQUE INDEX "article_categories_slug_idx" ON "article_categories" USING btree ("slug");
  CREATE INDEX "article_categories_updated_at_idx" ON "article_categories" USING btree ("updated_at");
  CREATE INDEX "article_categories_created_at_idx" ON "article_categories" USING btree ("created_at");
  CREATE UNIQUE INDEX "redirects_from_idx" ON "redirects" USING btree ("from");
  CREATE INDEX "redirects_updated_at_idx" ON "redirects" USING btree ("updated_at");
  CREATE INDEX "redirects_created_at_idx" ON "redirects" USING btree ("created_at");
  CREATE INDEX "redirects_rels_order_idx" ON "redirects_rels" USING btree ("order");
  CREATE INDEX "redirects_rels_parent_idx" ON "redirects_rels" USING btree ("parent_id");
  CREATE INDEX "redirects_rels_path_idx" ON "redirects_rels" USING btree ("path");
  CREATE INDEX "redirects_rels_pages_id_idx" ON "redirects_rels" USING btree ("pages_id");
  CREATE INDEX "redirects_rels_posts_id_idx" ON "redirects_rels" USING btree ("posts_id");
  CREATE INDEX "redirects_rels_domains_id_idx" ON "redirects_rels" USING btree ("domains_id");
  CREATE INDEX "forms_blocks_checkbox_order_idx" ON "forms_blocks_checkbox" USING btree ("_order");
  CREATE INDEX "forms_blocks_checkbox_parent_id_idx" ON "forms_blocks_checkbox" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_checkbox_path_idx" ON "forms_blocks_checkbox" USING btree ("_path");
  CREATE INDEX "forms_blocks_country_order_idx" ON "forms_blocks_country" USING btree ("_order");
  CREATE INDEX "forms_blocks_country_parent_id_idx" ON "forms_blocks_country" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_country_path_idx" ON "forms_blocks_country" USING btree ("_path");
  CREATE INDEX "forms_blocks_email_order_idx" ON "forms_blocks_email" USING btree ("_order");
  CREATE INDEX "forms_blocks_email_parent_id_idx" ON "forms_blocks_email" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_email_path_idx" ON "forms_blocks_email" USING btree ("_path");
  CREATE INDEX "forms_blocks_message_order_idx" ON "forms_blocks_message" USING btree ("_order");
  CREATE INDEX "forms_blocks_message_parent_id_idx" ON "forms_blocks_message" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_message_path_idx" ON "forms_blocks_message" USING btree ("_path");
  CREATE INDEX "forms_blocks_number_order_idx" ON "forms_blocks_number" USING btree ("_order");
  CREATE INDEX "forms_blocks_number_parent_id_idx" ON "forms_blocks_number" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_number_path_idx" ON "forms_blocks_number" USING btree ("_path");
  CREATE INDEX "forms_blocks_select_options_order_idx" ON "forms_blocks_select_options" USING btree ("_order");
  CREATE INDEX "forms_blocks_select_options_parent_id_idx" ON "forms_blocks_select_options" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_select_order_idx" ON "forms_blocks_select" USING btree ("_order");
  CREATE INDEX "forms_blocks_select_parent_id_idx" ON "forms_blocks_select" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_select_path_idx" ON "forms_blocks_select" USING btree ("_path");
  CREATE INDEX "forms_blocks_state_order_idx" ON "forms_blocks_state" USING btree ("_order");
  CREATE INDEX "forms_blocks_state_parent_id_idx" ON "forms_blocks_state" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_state_path_idx" ON "forms_blocks_state" USING btree ("_path");
  CREATE INDEX "forms_blocks_text_order_idx" ON "forms_blocks_text" USING btree ("_order");
  CREATE INDEX "forms_blocks_text_parent_id_idx" ON "forms_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_text_path_idx" ON "forms_blocks_text" USING btree ("_path");
  CREATE INDEX "forms_blocks_textarea_order_idx" ON "forms_blocks_textarea" USING btree ("_order");
  CREATE INDEX "forms_blocks_textarea_parent_id_idx" ON "forms_blocks_textarea" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_textarea_path_idx" ON "forms_blocks_textarea" USING btree ("_path");
  CREATE INDEX "forms_emails_order_idx" ON "forms_emails" USING btree ("_order");
  CREATE INDEX "forms_emails_parent_id_idx" ON "forms_emails" USING btree ("_parent_id");
  CREATE INDEX "forms_updated_at_idx" ON "forms" USING btree ("updated_at");
  CREATE INDEX "forms_created_at_idx" ON "forms" USING btree ("created_at");
  CREATE INDEX "form_submissions_submission_data_order_idx" ON "form_submissions_submission_data" USING btree ("_order");
  CREATE INDEX "form_submissions_submission_data_parent_id_idx" ON "form_submissions_submission_data" USING btree ("_parent_id");
  CREATE INDEX "form_submissions_form_idx" ON "form_submissions" USING btree ("form_id");
  CREATE INDEX "form_submissions_updated_at_idx" ON "form_submissions" USING btree ("updated_at");
  CREATE INDEX "form_submissions_created_at_idx" ON "form_submissions" USING btree ("created_at");
  CREATE INDEX "search_categories_order_idx" ON "search_categories" USING btree ("_order");
  CREATE INDEX "search_categories_parent_id_idx" ON "search_categories" USING btree ("_parent_id");
  CREATE INDEX "search_slug_idx" ON "search" USING btree ("slug");
  CREATE INDEX "search_search_keywords_idx" ON "search" USING btree ("search_keywords");
  CREATE INDEX "search_content_image_idx" ON "search" USING btree ("content_image_id");
  CREATE INDEX "search_meta_meta_image_idx" ON "search" USING btree ("meta_image_id");
  CREATE INDEX "search_updated_at_idx" ON "search" USING btree ("updated_at");
  CREATE INDEX "search_created_at_idx" ON "search" USING btree ("created_at");
  CREATE INDEX "search_rels_order_idx" ON "search_rels" USING btree ("order");
  CREATE INDEX "search_rels_parent_idx" ON "search_rels" USING btree ("parent_id");
  CREATE INDEX "search_rels_path_idx" ON "search_rels" USING btree ("path");
  CREATE INDEX "search_rels_pages_id_idx" ON "search_rels" USING btree ("pages_id");
  CREATE INDEX "search_rels_domains_id_idx" ON "search_rels" USING btree ("domains_id");
  CREATE INDEX "search_rels_posts_id_idx" ON "search_rels" USING btree ("posts_id");
  CREATE INDEX "search_rels_services_id_idx" ON "search_rels" USING btree ("services_id");
  CREATE INDEX "search_rels_videos_id_idx" ON "search_rels" USING btree ("videos_id");
  CREATE INDEX "search_rels_portfolios_id_idx" ON "search_rels" USING btree ("portfolios_id");
  CREATE INDEX "search_rels_articles_id_idx" ON "search_rels" USING btree ("articles_id");
  CREATE INDEX "payload_mcp_api_keys_user_idx" ON "payload_mcp_api_keys" USING btree ("user_id");
  CREATE INDEX "payload_mcp_api_keys_updated_at_idx" ON "payload_mcp_api_keys" USING btree ("updated_at");
  CREATE INDEX "payload_mcp_api_keys_created_at_idx" ON "payload_mcp_api_keys" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");
  CREATE INDEX "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");
  CREATE INDEX "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");
  CREATE INDEX "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");
  CREATE INDEX "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");
  CREATE INDEX "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");
  CREATE INDEX "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");
  CREATE INDEX "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");
  CREATE INDEX "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");
  CREATE INDEX "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");
  CREATE INDEX "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_domains_id_idx" ON "payload_locked_documents_rels" USING btree ("domains_id");
  CREATE INDEX "payload_locked_documents_rels_domain_sets_id_idx" ON "payload_locked_documents_rels" USING btree ("domain_sets_id");
  CREATE INDEX "payload_locked_documents_rels_domain_inquiries_id_idx" ON "payload_locked_documents_rels" USING btree ("domain_inquiries_id");
  CREATE INDEX "payload_locked_documents_rels_domain_category_id_idx" ON "payload_locked_documents_rels" USING btree ("domain_category_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_service_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("service_categories_id");
  CREATE INDEX "payload_locked_documents_rels_videos_id_idx" ON "payload_locked_documents_rels" USING btree ("videos_id");
  CREATE INDEX "payload_locked_documents_rels_video_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("video_categories_id");
  CREATE INDEX "payload_locked_documents_rels_portfolios_id_idx" ON "payload_locked_documents_rels" USING btree ("portfolios_id");
  CREATE INDEX "payload_locked_documents_rels_portfolio_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("portfolio_categories_id");
  CREATE INDEX "payload_locked_documents_rels_articles_id_idx" ON "payload_locked_documents_rels" USING btree ("articles_id");
  CREATE INDEX "payload_locked_documents_rels_article_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("article_categories_id");
  CREATE INDEX "payload_locked_documents_rels_redirects_id_idx" ON "payload_locked_documents_rels" USING btree ("redirects_id");
  CREATE INDEX "payload_locked_documents_rels_forms_id_idx" ON "payload_locked_documents_rels" USING btree ("forms_id");
  CREATE INDEX "payload_locked_documents_rels_form_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("form_submissions_id");
  CREATE INDEX "payload_locked_documents_rels_search_id_idx" ON "payload_locked_documents_rels" USING btree ("search_id");
  CREATE INDEX "payload_locked_documents_rels_payload_mcp_api_keys_id_idx" ON "payload_locked_documents_rels" USING btree ("payload_mcp_api_keys_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_rels_payload_mcp_api_keys_id_idx" ON "payload_preferences_rels" USING btree ("payload_mcp_api_keys_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "header_nav_items_submenu_items_order_idx" ON "header_nav_items_submenu_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_submenu_items_parent_id_idx" ON "header_nav_items_submenu_items" USING btree ("_parent_id");
  CREATE INDEX "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");
  CREATE INDEX "header_nav_items_mega_menu_featured_mega_menu_featured_i_idx" ON "header_nav_items" USING btree ("mega_menu_featured_image_id");
  CREATE INDEX "header_rels_order_idx" ON "header_rels" USING btree ("order");
  CREATE INDEX "header_rels_parent_idx" ON "header_rels" USING btree ("parent_id");
  CREATE INDEX "header_rels_path_idx" ON "header_rels" USING btree ("path");
  CREATE INDEX "header_rels_pages_id_idx" ON "header_rels" USING btree ("pages_id");
  CREATE INDEX "header_rels_posts_id_idx" ON "header_rels" USING btree ("posts_id");
  CREATE INDEX "header_rels_domains_id_idx" ON "header_rels" USING btree ("domains_id");
  CREATE INDEX "header_rels_services_id_idx" ON "header_rels" USING btree ("services_id");
  CREATE INDEX "header_rels_videos_id_idx" ON "header_rels" USING btree ("videos_id");
  CREATE INDEX "header_rels_portfolios_id_idx" ON "header_rels" USING btree ("portfolios_id");
  CREATE INDEX "header_rels_articles_id_idx" ON "header_rels" USING btree ("articles_id");
  CREATE INDEX "footer_nav_items_order_idx" ON "footer_nav_items" USING btree ("_order");
  CREATE INDEX "footer_nav_items_parent_id_idx" ON "footer_nav_items" USING btree ("_parent_id");
  CREATE INDEX "footer_rels_order_idx" ON "footer_rels" USING btree ("order");
  CREATE INDEX "footer_rels_parent_idx" ON "footer_rels" USING btree ("parent_id");
  CREATE INDEX "footer_rels_path_idx" ON "footer_rels" USING btree ("path");
  CREATE INDEX "footer_rels_pages_id_idx" ON "footer_rels" USING btree ("pages_id");
  CREATE INDEX "footer_rels_services_id_idx" ON "footer_rels" USING btree ("services_id");
  CREATE INDEX "site_settings_logo_idx" ON "site_settings" USING btree ("logo_id");
  CREATE INDEX "site_settings_default_og_image_idx" ON "site_settings" USING btree ("default_og_image_id");
  CREATE INDEX "cta_settings_groups_order_idx" ON "cta_settings_groups" USING btree ("_order");
  CREATE INDEX "cta_settings_groups_parent_id_idx" ON "cta_settings_groups" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "cta_settings_groups_slug_idx" ON "cta_settings_groups" USING btree ("slug");
  CREATE INDEX "domains_settings_default_content_rich_summary_bullets_order_idx" ON "domains_settings_default_content_rich_summary_bullets" USING btree ("_order");
  CREATE INDEX "domains_settings_default_content_rich_summary_bullets_parent_id_idx" ON "domains_settings_default_content_rich_summary_bullets" USING btree ("_parent_id");
  CREATE INDEX "domains_settings_default_content_use_cases_order_idx" ON "domains_settings_default_content_use_cases" USING btree ("_order");
  CREATE INDEX "domains_settings_default_content_use_cases_parent_id_idx" ON "domains_settings_default_content_use_cases" USING btree ("_parent_id");
  CREATE INDEX "domains_settings_hero_image_idx" ON "domains_settings" USING btree ("hero_image_id");
  CREATE INDEX "domains_settings_default_image_idx" ON "domains_settings" USING btree ("default_image_id");
  CREATE INDEX "domains_settings_contact_form_contact_form_form_template_idx" ON "domains_settings" USING btree ("contact_form_form_template_id");
  CREATE INDEX "domains_settings_og_image_idx" ON "domains_settings" USING btree ("og_image_id");
  CREATE INDEX "services_settings_hero_image_idx" ON "services_settings" USING btree ("hero_image_id");
  CREATE INDEX "services_settings_og_image_idx" ON "services_settings" USING btree ("og_image_id");
  CREATE INDEX "videos_settings_hero_image_idx" ON "videos_settings" USING btree ("hero_image_id");
  CREATE INDEX "videos_settings_og_image_idx" ON "videos_settings" USING btree ("og_image_id");
  CREATE INDEX "portfolios_settings_hero_image_idx" ON "portfolios_settings" USING btree ("hero_image_id");
  CREATE INDEX "portfolios_settings_og_image_idx" ON "portfolios_settings" USING btree ("og_image_id");
  CREATE INDEX "articles_settings_hero_image_idx" ON "articles_settings" USING btree ("hero_image_id");
  CREATE INDEX "articles_settings_og_image_idx" ON "articles_settings" USING btree ("og_image_id");
  CREATE INDEX "posts_settings_hero_image_idx" ON "posts_settings" USING btree ("hero_image_id");
  CREATE INDEX "posts_settings_og_image_idx" ON "posts_settings" USING btree ("og_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_accordion_items" CASCADE;
  DROP TABLE "pages_blocks_accordion" CASCADE;
  DROP TABLE "pages_blocks_action_card_grid_cards" CASCADE;
  DROP TABLE "pages_blocks_action_card_grid" CASCADE;
  DROP TABLE "pages_blocks_archive" CASCADE;
  DROP TABLE "pages_blocks_cta_links" CASCADE;
  DROP TABLE "pages_blocks_cta" CASCADE;
  DROP TABLE "pages_blocks_capabilities_grid_items" CASCADE;
  DROP TABLE "pages_blocks_capabilities_grid" CASCADE;
  DROP TABLE "pages_blocks_centered_content" CASCADE;
  DROP TABLE "pages_blocks_client_logos_clients" CASCADE;
  DROP TABLE "pages_blocks_client_logos" CASCADE;
  DROP TABLE "pages_blocks_company_facts_facts" CASCADE;
  DROP TABLE "pages_blocks_company_facts" CASCADE;
  DROP TABLE "pages_blocks_contact_info" CASCADE;
  DROP TABLE "pages_blocks_code" CASCADE;
  DROP TABLE "pages_blocks_content_columns" CASCADE;
  DROP TABLE "pages_blocks_content" CASCADE;
  DROP TABLE "pages_blocks_domain_showcase" CASCADE;
  DROP TABLE "pages_blocks_form_block" CASCADE;
  DROP TABLE "pages_blocks_hero_carousel_slides" CASCADE;
  DROP TABLE "pages_blocks_hero_carousel" CASCADE;
  DROP TABLE "pages_blocks_hero_header_slides" CASCADE;
  DROP TABLE "pages_blocks_hero_header" CASCADE;
  DROP TABLE "pages_blocks_image_gallery_images" CASCADE;
  DROP TABLE "pages_blocks_image_gallery" CASCADE;
  DROP TABLE "pages_blocks_media_block" CASCADE;
  DROP TABLE "pages_blocks_metrics_bar_items" CASCADE;
  DROP TABLE "pages_blocks_metrics_bar" CASCADE;
  DROP TABLE "pages_blocks_notice" CASCADE;
  DROP TABLE "pages_blocks_portfolio_cards_projects" CASCADE;
  DROP TABLE "pages_blocks_portfolio_cards" CASCADE;
  DROP TABLE "pages_blocks_services_block" CASCADE;
  DROP TABLE "pages_blocks_split1x2" CASCADE;
  DROP TABLE "pages_blocks_split_section" CASCADE;
  DROP TABLE "pages_blocks_tabs_tabs" CASCADE;
  DROP TABLE "pages_blocks_tabs" CASCADE;
  DROP TABLE "pages_blocks_thesis_stats_stats" CASCADE;
  DROP TABLE "pages_blocks_thesis_stats" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_blocks_accordion_items" CASCADE;
  DROP TABLE "_pages_v_blocks_accordion" CASCADE;
  DROP TABLE "_pages_v_blocks_action_card_grid_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_action_card_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_archive" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_links" CASCADE;
  DROP TABLE "_pages_v_blocks_cta" CASCADE;
  DROP TABLE "_pages_v_blocks_capabilities_grid_items" CASCADE;
  DROP TABLE "_pages_v_blocks_capabilities_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_centered_content" CASCADE;
  DROP TABLE "_pages_v_blocks_client_logos_clients" CASCADE;
  DROP TABLE "_pages_v_blocks_client_logos" CASCADE;
  DROP TABLE "_pages_v_blocks_company_facts_facts" CASCADE;
  DROP TABLE "_pages_v_blocks_company_facts" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_info" CASCADE;
  DROP TABLE "_pages_v_blocks_code" CASCADE;
  DROP TABLE "_pages_v_blocks_content_columns" CASCADE;
  DROP TABLE "_pages_v_blocks_content" CASCADE;
  DROP TABLE "_pages_v_blocks_domain_showcase" CASCADE;
  DROP TABLE "_pages_v_blocks_form_block" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_carousel_slides" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_carousel" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_header_slides" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_header" CASCADE;
  DROP TABLE "_pages_v_blocks_image_gallery_images" CASCADE;
  DROP TABLE "_pages_v_blocks_image_gallery" CASCADE;
  DROP TABLE "_pages_v_blocks_media_block" CASCADE;
  DROP TABLE "_pages_v_blocks_metrics_bar_items" CASCADE;
  DROP TABLE "_pages_v_blocks_metrics_bar" CASCADE;
  DROP TABLE "_pages_v_blocks_notice" CASCADE;
  DROP TABLE "_pages_v_blocks_portfolio_cards_projects" CASCADE;
  DROP TABLE "_pages_v_blocks_portfolio_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_services_block" CASCADE;
  DROP TABLE "_pages_v_blocks_split1x2" CASCADE;
  DROP TABLE "_pages_v_blocks_split_section" CASCADE;
  DROP TABLE "_pages_v_blocks_tabs_tabs" CASCADE;
  DROP TABLE "_pages_v_blocks_tabs" CASCADE;
  DROP TABLE "_pages_v_blocks_thesis_stats_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_thesis_stats" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "posts_takeaways" CASCADE;
  DROP TABLE "posts_tags" CASCADE;
  DROP TABLE "posts_populated_authors" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "posts_rels" CASCADE;
  DROP TABLE "_posts_v_version_takeaways" CASCADE;
  DROP TABLE "_posts_v_version_tags" CASCADE;
  DROP TABLE "_posts_v_version_populated_authors" CASCADE;
  DROP TABLE "_posts_v" CASCADE;
  DROP TABLE "_posts_v_rels" CASCADE;
  DROP TABLE "domains_rich_summary_bullets" CASCADE;
  DROP TABLE "domains_use_cases" CASCADE;
  DROP TABLE "domains" CASCADE;
  DROP TABLE "_domains_v_version_rich_summary_bullets" CASCADE;
  DROP TABLE "_domains_v_version_use_cases" CASCADE;
  DROP TABLE "_domains_v" CASCADE;
  DROP TABLE "domain_sets" CASCADE;
  DROP TABLE "domain_sets_rels" CASCADE;
  DROP TABLE "domain_inquiries" CASCADE;
  DROP TABLE "domain_category" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "categories_breadcrumbs" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "services_deliverables" CASCADE;
  DROP TABLE "services_authority_section_items" CASCADE;
  DROP TABLE "services_blocks_accordion_items" CASCADE;
  DROP TABLE "services_blocks_accordion" CASCADE;
  DROP TABLE "services_blocks_action_card_grid_cards" CASCADE;
  DROP TABLE "services_blocks_action_card_grid" CASCADE;
  DROP TABLE "services_blocks_cta_links" CASCADE;
  DROP TABLE "services_blocks_cta" CASCADE;
  DROP TABLE "services_blocks_centered_content" CASCADE;
  DROP TABLE "services_blocks_content_columns" CASCADE;
  DROP TABLE "services_blocks_content" CASCADE;
  DROP TABLE "services_blocks_hero_carousel_slides" CASCADE;
  DROP TABLE "services_blocks_hero_carousel" CASCADE;
  DROP TABLE "services_blocks_image_gallery_images" CASCADE;
  DROP TABLE "services_blocks_image_gallery" CASCADE;
  DROP TABLE "services_blocks_metrics_bar_items" CASCADE;
  DROP TABLE "services_blocks_metrics_bar" CASCADE;
  DROP TABLE "services_blocks_notice" CASCADE;
  DROP TABLE "services_blocks_split1x2" CASCADE;
  DROP TABLE "services_blocks_split_section" CASCADE;
  DROP TABLE "services_blocks_tabs_tabs" CASCADE;
  DROP TABLE "services_blocks_tabs" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "services_rels" CASCADE;
  DROP TABLE "service_categories" CASCADE;
  DROP TABLE "videos_tags" CASCADE;
  DROP TABLE "videos" CASCADE;
  DROP TABLE "videos_rels" CASCADE;
  DROP TABLE "_videos_v_version_tags" CASCADE;
  DROP TABLE "_videos_v" CASCADE;
  DROP TABLE "_videos_v_rels" CASCADE;
  DROP TABLE "video_categories" CASCADE;
  DROP TABLE "portfolios_gallery" CASCADE;
  DROP TABLE "portfolios_technologies" CASCADE;
  DROP TABLE "portfolios" CASCADE;
  DROP TABLE "portfolios_rels" CASCADE;
  DROP TABLE "_portfolios_v_version_gallery" CASCADE;
  DROP TABLE "_portfolios_v_version_technologies" CASCADE;
  DROP TABLE "_portfolios_v" CASCADE;
  DROP TABLE "_portfolios_v_rels" CASCADE;
  DROP TABLE "portfolio_categories" CASCADE;
  DROP TABLE "articles_takeaways" CASCADE;
  DROP TABLE "articles_tags" CASCADE;
  DROP TABLE "articles" CASCADE;
  DROP TABLE "articles_rels" CASCADE;
  DROP TABLE "_articles_v_version_takeaways" CASCADE;
  DROP TABLE "_articles_v_version_tags" CASCADE;
  DROP TABLE "_articles_v" CASCADE;
  DROP TABLE "_articles_v_rels" CASCADE;
  DROP TABLE "article_categories" CASCADE;
  DROP TABLE "redirects" CASCADE;
  DROP TABLE "redirects_rels" CASCADE;
  DROP TABLE "forms_blocks_checkbox" CASCADE;
  DROP TABLE "forms_blocks_country" CASCADE;
  DROP TABLE "forms_blocks_email" CASCADE;
  DROP TABLE "forms_blocks_message" CASCADE;
  DROP TABLE "forms_blocks_number" CASCADE;
  DROP TABLE "forms_blocks_select_options" CASCADE;
  DROP TABLE "forms_blocks_select" CASCADE;
  DROP TABLE "forms_blocks_state" CASCADE;
  DROP TABLE "forms_blocks_text" CASCADE;
  DROP TABLE "forms_blocks_textarea" CASCADE;
  DROP TABLE "forms_emails" CASCADE;
  DROP TABLE "forms" CASCADE;
  DROP TABLE "form_submissions_submission_data" CASCADE;
  DROP TABLE "form_submissions" CASCADE;
  DROP TABLE "search_categories" CASCADE;
  DROP TABLE "search" CASCADE;
  DROP TABLE "search_rels" CASCADE;
  DROP TABLE "payload_mcp_api_keys" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_jobs_log" CASCADE;
  DROP TABLE "payload_jobs" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "header_nav_items_submenu_items" CASCADE;
  DROP TABLE "header_nav_items" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "header_rels" CASCADE;
  DROP TABLE "footer_nav_items" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "footer_rels" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "cta_settings_groups" CASCADE;
  DROP TABLE "cta_settings" CASCADE;
  DROP TABLE "domains_settings_default_content_rich_summary_bullets" CASCADE;
  DROP TABLE "domains_settings_default_content_use_cases" CASCADE;
  DROP TABLE "domains_settings" CASCADE;
  DROP TABLE "services_settings" CASCADE;
  DROP TABLE "videos_settings" CASCADE;
  DROP TABLE "portfolios_settings" CASCADE;
  DROP TABLE "articles_settings" CASCADE;
  DROP TABLE "posts_settings" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_accordion_heading_alignment";
  DROP TYPE "public"."enum_pages_blocks_accordion_background";
  DROP TYPE "public"."enum_pages_blocks_accordion_spacing_density";
  DROP TYPE "public"."enum_pages_blocks_action_card_grid_cards_media_type";
  DROP TYPE "public"."enum_pages_blocks_action_card_grid_cards_icon";
  DROP TYPE "public"."enum_pages_blocks_action_card_grid_cards_link_type";
  DROP TYPE "public"."enum_pages_blocks_action_card_grid_heading_alignment";
  DROP TYPE "public"."enum_pages_blocks_action_card_grid_columns";
  DROP TYPE "public"."enum_pages_blocks_action_card_grid_card_style";
  DROP TYPE "public"."enum_pages_blocks_action_card_grid_section_alignment";
  DROP TYPE "public"."enum_pages_blocks_action_card_grid_card_alignment";
  DROP TYPE "public"."enum_pages_blocks_action_card_grid_section_background";
  DROP TYPE "public"."enum_pages_blocks_action_card_grid_spacing_density";
  DROP TYPE "public"."enum_pages_blocks_archive_populate_by";
  DROP TYPE "public"."enum_pages_blocks_archive_relation_to";
  DROP TYPE "public"."enum_pages_blocks_cta_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_cta_background_color";
  DROP TYPE "public"."enum_pages_blocks_cta_spacing_density";
  DROP TYPE "public"."enum_pages_blocks_capabilities_grid_heading_alignment";
  DROP TYPE "public"."enum_pages_blocks_centered_content_heading_alignment";
  DROP TYPE "public"."enum_pages_blocks_centered_content_alignment";
  DROP TYPE "public"."enum_pages_blocks_centered_content_width";
  DROP TYPE "public"."enum_pages_blocks_centered_content_background_color";
  DROP TYPE "public"."enum_pages_blocks_centered_content_primary_link_type";
  DROP TYPE "public"."enum_pages_blocks_centered_content_secondary_link_type";
  DROP TYPE "public"."enum_pages_blocks_centered_content_spacing_density";
  DROP TYPE "public"."enum_pages_blocks_client_logos_heading_alignment";
  DROP TYPE "public"."enum_pages_blocks_company_facts_heading_alignment";
  DROP TYPE "public"."enum_pages_blocks_contact_info_heading_alignment";
  DROP TYPE "public"."enum_pages_blocks_code_language";
  DROP TYPE "public"."enum_pages_blocks_content_columns_size";
  DROP TYPE "public"."enum_pages_blocks_content_columns_link_type";
  DROP TYPE "public"."enum_pages_blocks_content_background_color";
  DROP TYPE "public"."enum_pages_blocks_content_spacing_density";
  DROP TYPE "public"."enum_pages_blocks_domain_showcase_source_mode";
  DROP TYPE "public"."enum_pages_blocks_domain_showcase_heading_alignment";
  DROP TYPE "public"."enum_pages_blocks_domain_showcase_background_color";
  DROP TYPE "public"."enum_pages_blocks_domain_showcase_spacing_density";
  DROP TYPE "public"."enum_sl_pri_link_type";
  DROP TYPE "public"."enum_sl_sec_link_type";
  DROP TYPE "public"."enum_pages_blocks_hero_carousel_text_alignment";
  DROP TYPE "public"."enum_sc_pri_link_type";
  DROP TYPE "public"."enum_sc_sec_link_type";
  DROP TYPE "public"."enum_pages_blocks_hero_carousel_height";
  DROP TYPE "public"."enum_pages_blocks_hero_header_size";
  DROP TYPE "public"."enum_pages_blocks_hero_header_heading_alignment";
  DROP TYPE "public"."enum_hh_pri_link_type";
  DROP TYPE "public"."enum_pages_blocks_image_gallery_heading_alignment";
  DROP TYPE "public"."enum_pages_blocks_image_gallery_columns";
  DROP TYPE "public"."enum_pages_blocks_image_gallery_aspect_ratio";
  DROP TYPE "public"."enum_pages_blocks_image_gallery_gap";
  DROP TYPE "public"."enum_pages_blocks_image_gallery_caption_alignment";
  DROP TYPE "public"."enum_pages_blocks_image_gallery_background_color";
  DROP TYPE "public"."enum_pages_blocks_image_gallery_spacing_density";
  DROP TYPE "public"."enum_pages_blocks_metrics_bar_items_icon";
  DROP TYPE "public"."enum_pages_blocks_metrics_bar_mode";
  DROP TYPE "public"."enum_pages_blocks_metrics_bar_heading_alignment";
  DROP TYPE "public"."enum_pages_blocks_metrics_bar_background";
  DROP TYPE "public"."enum_pages_blocks_metrics_bar_big_number_alignment";
  DROP TYPE "public"."enum_pages_blocks_metrics_bar_spacing_density";
  DROP TYPE "public"."enum_pages_blocks_notice_variant";
  DROP TYPE "public"."enum_pages_blocks_notice_custom_icon";
  DROP TYPE "public"."enum_pages_blocks_notice_heading_alignment";
  DROP TYPE "public"."enum_pages_blocks_portfolio_cards_heading_alignment";
  DROP TYPE "public"."enum_pages_blocks_services_block_heading_alignment";
  DROP TYPE "public"."enum_pages_blocks_services_block_layout";
  DROP TYPE "public"."enum_pages_blocks_services_block_spacing_density";
  DROP TYPE "public"."enum_pages_blocks_split1x2_small_column_position";
  DROP TYPE "public"."enum_pages_blocks_split1x2_heading_alignment";
  DROP TYPE "public"."enum_pages_blocks_split1x2_small_column_display_type";
  DROP TYPE "public"."enum_pages_blocks_split1x2_background_color";
  DROP TYPE "public"."enum_pages_blocks_split1x2_spacing_density";
  DROP TYPE "public"."enum_pages_blocks_split_section_heading_alignment";
  DROP TYPE "public"."enum_pages_blocks_split_section_image_position";
  DROP TYPE "public"."enum_pages_blocks_split_section_layout_style";
  DROP TYPE "public"."enum_pages_blocks_split_section_background_color";
  DROP TYPE "public"."enum_pages_blocks_split_section_primary_link_type";
  DROP TYPE "public"."enum_pages_blocks_split_section_secondary_link_type";
  DROP TYPE "public"."enum_pages_blocks_split_section_spacing_density";
  DROP TYPE "public"."enum_pages_blocks_tabs_tabs_tab_icon";
  DROP TYPE "public"."enum_pages_blocks_tabs_heading_alignment";
  DROP TYPE "public"."enum_pages_blocks_tabs_tab_alignment";
  DROP TYPE "public"."enum_pages_blocks_tabs_tab_style";
  DROP TYPE "public"."enum_pages_blocks_tabs_background";
  DROP TYPE "public"."enum_pages_blocks_tabs_spacing_density";
  DROP TYPE "public"."enum_pages_blocks_thesis_stats_heading_alignment";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_accordion_heading_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_accordion_background";
  DROP TYPE "public"."enum__pages_v_blocks_accordion_spacing_density";
  DROP TYPE "public"."enum__pages_v_blocks_action_card_grid_cards_media_type";
  DROP TYPE "public"."enum__pages_v_blocks_action_card_grid_cards_icon";
  DROP TYPE "public"."enum__pages_v_blocks_action_card_grid_cards_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_action_card_grid_heading_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_action_card_grid_columns";
  DROP TYPE "public"."enum__pages_v_blocks_action_card_grid_card_style";
  DROP TYPE "public"."enum__pages_v_blocks_action_card_grid_section_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_action_card_grid_card_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_action_card_grid_section_background";
  DROP TYPE "public"."enum__pages_v_blocks_action_card_grid_spacing_density";
  DROP TYPE "public"."enum__pages_v_blocks_archive_populate_by";
  DROP TYPE "public"."enum__pages_v_blocks_archive_relation_to";
  DROP TYPE "public"."enum__pages_v_blocks_cta_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_cta_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_cta_spacing_density";
  DROP TYPE "public"."enum__pages_v_blocks_capabilities_grid_heading_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_centered_content_heading_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_centered_content_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_centered_content_width";
  DROP TYPE "public"."enum__pages_v_blocks_centered_content_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_centered_content_primary_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_centered_content_secondary_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_centered_content_spacing_density";
  DROP TYPE "public"."enum__pages_v_blocks_client_logos_heading_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_company_facts_heading_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_contact_info_heading_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_code_language";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_size";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_content_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_content_spacing_density";
  DROP TYPE "public"."enum__pages_v_blocks_domain_showcase_source_mode";
  DROP TYPE "public"."enum__pages_v_blocks_domain_showcase_heading_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_domain_showcase_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_domain_showcase_spacing_density";
  DROP TYPE "public"."enum__pages_v_blocks_hero_carousel_text_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_hero_carousel_height";
  DROP TYPE "public"."enum__pages_v_blocks_hero_header_size";
  DROP TYPE "public"."enum__pages_v_blocks_hero_header_heading_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_image_gallery_heading_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_image_gallery_columns";
  DROP TYPE "public"."enum__pages_v_blocks_image_gallery_aspect_ratio";
  DROP TYPE "public"."enum__pages_v_blocks_image_gallery_gap";
  DROP TYPE "public"."enum__pages_v_blocks_image_gallery_caption_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_image_gallery_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_image_gallery_spacing_density";
  DROP TYPE "public"."enum__pages_v_blocks_metrics_bar_items_icon";
  DROP TYPE "public"."enum__pages_v_blocks_metrics_bar_mode";
  DROP TYPE "public"."enum__pages_v_blocks_metrics_bar_heading_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_metrics_bar_background";
  DROP TYPE "public"."enum__pages_v_blocks_metrics_bar_big_number_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_metrics_bar_spacing_density";
  DROP TYPE "public"."enum__pages_v_blocks_notice_variant";
  DROP TYPE "public"."enum__pages_v_blocks_notice_custom_icon";
  DROP TYPE "public"."enum__pages_v_blocks_notice_heading_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_portfolio_cards_heading_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_services_block_heading_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_services_block_layout";
  DROP TYPE "public"."enum__pages_v_blocks_services_block_spacing_density";
  DROP TYPE "public"."enum__pages_v_blocks_split1x2_small_column_position";
  DROP TYPE "public"."enum__pages_v_blocks_split1x2_heading_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_split1x2_small_column_display_type";
  DROP TYPE "public"."enum__pages_v_blocks_split1x2_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_split1x2_spacing_density";
  DROP TYPE "public"."enum__pages_v_blocks_split_section_heading_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_split_section_image_position";
  DROP TYPE "public"."enum__pages_v_blocks_split_section_layout_style";
  DROP TYPE "public"."enum__pages_v_blocks_split_section_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_split_section_primary_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_split_section_secondary_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_split_section_spacing_density";
  DROP TYPE "public"."enum__pages_v_blocks_tabs_tabs_tab_icon";
  DROP TYPE "public"."enum__pages_v_blocks_tabs_heading_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_tabs_tab_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_tabs_tab_style";
  DROP TYPE "public"."enum__pages_v_blocks_tabs_background";
  DROP TYPE "public"."enum__pages_v_blocks_tabs_spacing_density";
  DROP TYPE "public"."enum__pages_v_blocks_thesis_stats_heading_alignment";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_posts_status";
  DROP TYPE "public"."enum__posts_v_version_status";
  DROP TYPE "public"."enum_domains_domain_script";
  DROP TYPE "public"."enum_domains_status";
  DROP TYPE "public"."enum__domains_v_version_domain_script";
  DROP TYPE "public"."enum__domains_v_version_status";
  DROP TYPE "public"."enum_domain_sets_policy";
  DROP TYPE "public"."enum_domain_inquiries_budget";
  DROP TYPE "public"."enum_domain_inquiries_status";
  DROP TYPE "public"."enum_domain_category_icon";
  DROP TYPE "public"."enum_services_blocks_accordion_heading_alignment";
  DROP TYPE "public"."enum_services_blocks_accordion_background";
  DROP TYPE "public"."enum_services_blocks_accordion_spacing_density";
  DROP TYPE "public"."enum_services_blocks_action_card_grid_cards_media_type";
  DROP TYPE "public"."enum_services_blocks_action_card_grid_cards_icon";
  DROP TYPE "public"."enum_services_blocks_action_card_grid_cards_link_type";
  DROP TYPE "public"."enum_services_blocks_action_card_grid_heading_alignment";
  DROP TYPE "public"."enum_services_blocks_action_card_grid_columns";
  DROP TYPE "public"."enum_services_blocks_action_card_grid_card_style";
  DROP TYPE "public"."enum_services_blocks_action_card_grid_section_alignment";
  DROP TYPE "public"."enum_services_blocks_action_card_grid_card_alignment";
  DROP TYPE "public"."enum_services_blocks_action_card_grid_section_background";
  DROP TYPE "public"."enum_services_blocks_action_card_grid_spacing_density";
  DROP TYPE "public"."enum_services_blocks_cta_links_link_type";
  DROP TYPE "public"."enum_services_blocks_cta_background_color";
  DROP TYPE "public"."enum_services_blocks_cta_spacing_density";
  DROP TYPE "public"."enum_services_blocks_centered_content_heading_alignment";
  DROP TYPE "public"."enum_services_blocks_centered_content_alignment";
  DROP TYPE "public"."enum_services_blocks_centered_content_width";
  DROP TYPE "public"."enum_services_blocks_centered_content_background_color";
  DROP TYPE "public"."enum_services_blocks_centered_content_primary_link_type";
  DROP TYPE "public"."enum_services_blocks_centered_content_secondary_link_type";
  DROP TYPE "public"."enum_services_blocks_centered_content_spacing_density";
  DROP TYPE "public"."enum_services_blocks_content_columns_size";
  DROP TYPE "public"."enum_services_blocks_content_columns_link_type";
  DROP TYPE "public"."enum_services_blocks_content_background_color";
  DROP TYPE "public"."enum_services_blocks_content_spacing_density";
  DROP TYPE "public"."enum_services_blocks_hero_carousel_text_alignment";
  DROP TYPE "public"."enum_services_blocks_hero_carousel_height";
  DROP TYPE "public"."enum_services_blocks_image_gallery_heading_alignment";
  DROP TYPE "public"."enum_services_blocks_image_gallery_columns";
  DROP TYPE "public"."enum_services_blocks_image_gallery_aspect_ratio";
  DROP TYPE "public"."enum_services_blocks_image_gallery_gap";
  DROP TYPE "public"."enum_services_blocks_image_gallery_caption_alignment";
  DROP TYPE "public"."enum_services_blocks_image_gallery_background_color";
  DROP TYPE "public"."enum_services_blocks_image_gallery_spacing_density";
  DROP TYPE "public"."enum_services_blocks_metrics_bar_items_icon";
  DROP TYPE "public"."enum_services_blocks_metrics_bar_mode";
  DROP TYPE "public"."enum_services_blocks_metrics_bar_heading_alignment";
  DROP TYPE "public"."enum_services_blocks_metrics_bar_background";
  DROP TYPE "public"."enum_services_blocks_metrics_bar_big_number_alignment";
  DROP TYPE "public"."enum_services_blocks_metrics_bar_spacing_density";
  DROP TYPE "public"."enum_services_blocks_notice_variant";
  DROP TYPE "public"."enum_services_blocks_notice_custom_icon";
  DROP TYPE "public"."enum_services_blocks_notice_heading_alignment";
  DROP TYPE "public"."enum_services_blocks_split1x2_small_column_position";
  DROP TYPE "public"."enum_services_blocks_split1x2_heading_alignment";
  DROP TYPE "public"."enum_services_blocks_split1x2_small_column_display_type";
  DROP TYPE "public"."enum_services_blocks_split1x2_background_color";
  DROP TYPE "public"."enum_services_blocks_split1x2_spacing_density";
  DROP TYPE "public"."enum_services_blocks_split_section_heading_alignment";
  DROP TYPE "public"."enum_services_blocks_split_section_image_position";
  DROP TYPE "public"."enum_services_blocks_split_section_layout_style";
  DROP TYPE "public"."enum_services_blocks_split_section_background_color";
  DROP TYPE "public"."enum_services_blocks_split_section_primary_link_type";
  DROP TYPE "public"."enum_services_blocks_split_section_secondary_link_type";
  DROP TYPE "public"."enum_services_blocks_split_section_spacing_density";
  DROP TYPE "public"."enum_services_blocks_tabs_tabs_tab_icon";
  DROP TYPE "public"."enum_services_blocks_tabs_heading_alignment";
  DROP TYPE "public"."enum_services_blocks_tabs_tab_alignment";
  DROP TYPE "public"."enum_services_blocks_tabs_tab_style";
  DROP TYPE "public"."enum_services_blocks_tabs_background";
  DROP TYPE "public"."enum_services_blocks_tabs_spacing_density";
  DROP TYPE "public"."enum_services_icon";
  DROP TYPE "public"."enum_videos_video_type";
  DROP TYPE "public"."enum_videos_status";
  DROP TYPE "public"."enum__videos_v_version_video_type";
  DROP TYPE "public"."enum__videos_v_version_status";
  DROP TYPE "public"."enum_portfolios_status";
  DROP TYPE "public"."enum__portfolios_v_version_status";
  DROP TYPE "public"."enum_articles_article_type";
  DROP TYPE "public"."enum_articles_status";
  DROP TYPE "public"."enum__articles_v_version_article_type";
  DROP TYPE "public"."enum__articles_v_version_status";
  DROP TYPE "public"."enum_redirects_to_type";
  DROP TYPE "public"."enum_forms_confirmation_type";
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  DROP TYPE "public"."enum_payload_jobs_log_state";
  DROP TYPE "public"."enum_payload_jobs_task_slug";
  DROP TYPE "public"."enum_header_nav_items_submenu_items_icon";
  DROP TYPE "public"."enum_header_nav_items_link_type";
  DROP TYPE "public"."enum_header_nav_items_nav_group";
  DROP TYPE "public"."enum_header_nav_items_icon";
  DROP TYPE "public"."enum_header_nav_items_submenu_type";
  DROP TYPE "public"."enum_header_nav_items_submenu_columns";
  DROP TYPE "public"."enum_header_nav_position";
  DROP TYPE "public"."enum_header_separator";
  DROP TYPE "public"."enum_header_search_display";
  DROP TYPE "public"."enum_footer_nav_items_link_type";
  DROP TYPE "public"."enum_site_settings_language";
  DROP TYPE "public"."enum_site_settings_locale";
  DROP TYPE "public"."enum_site_settings_typography_heading_weight";
  DROP TYPE "public"."enum_site_settings_typography_body_weight";
  DROP TYPE "public"."enum_site_settings_typography_base_size";
  DROP TYPE "public"."enum_site_settings_layout_container_width";
  DROP TYPE "public"."enum_site_settings_layout_border_radius";
  DROP TYPE "public"."enum_cta_settings_groups_default_button_color";
  DROP TYPE "public"."enum_cta_settings_groups_default_button_variant";
  DROP TYPE "public"."enum_cta_settings_groups_default_button_size";
  DROP TYPE "public"."enum_domains_settings_display_sort_field";
  DROP TYPE "public"."enum_domains_settings_display_sort_dir";
  DROP TYPE "public"."enum_domains_settings_currency_code";`)
}
