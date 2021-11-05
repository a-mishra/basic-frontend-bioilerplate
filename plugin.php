<?php
/**
 * Plugin Name: section2
 * Plugin URI: https://github.com/ahmadawais/create-guten-block/
 * Description: section2 — is a Gutenberg plugin that adds Section#2 to blocks editor, specifically designed for one-payu-website.
 * Author: Ashutosh Mishra
 * Author URI: https://a-mishra.github.io/
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

const handle = 'section2';


function initial_registrations() {
    register_block_category();
    register_scripts();
    register_styles();
	register_block_type(
		handle , array(
			'style'         => handle.'-main-css',
			'editor_script' => handle.'-editor-js',
			'editor_style'  => handle.'-editor-css',
		)
	);
}

// Hook: Block assets.
add_action( 'init', 'initial_registrations' );




function register_block_category() {
    function filter_block_categories_when_post_provided( $block_categories, $editor_context ) {
		if ( ! empty( $editor_context->post ) ) {
			array_push(
				$block_categories,
				array(
					'slug'  => 'sections',
					'title' => __( 'Sections', 'sections' ),
					'icon'  => null,
				)
			);
		}
		return $block_categories;
	}
    add_filter( 'block_categories_all', 'filter_block_categories_when_post_provided', 10, 2 );
};

function register_scripts() {
	wp_register_script(
		handle.'-editor-js',
		plugins_url( '/assets/dist/main.bundle.js', dirname( __FILE__ ) ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ),
		null,
		true
	);
}

function register_styles() {
	wp_register_style(
		handle.'-editor-css', 
		plugins_url( '/assets/dist/editor.css', dirname( __FILE__ ) ),
		array( 'wp-edit-blocks' ),
		null
	);

	wp_register_style(
		handle.'-main-css', 
		plugins_url( '/assets/dist/main.css', dirname( __FILE__ ) ), 
		is_admin() ? array( 'wp-editor' ) : null,
        null
	);
}