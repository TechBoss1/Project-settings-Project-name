import { registerBlockType } from '@wordpress/blocks';
import { RichText, MediaUpload } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

registerBlockType('dynamic-testimonials/testimonial', {
    title: 'Dynamic Testimonial',
    icon: 'format-quote',
    category: 'common',
    attributes: {
        testimonialText: {
            type: 'string',
            source: 'html',
            selector: '.testimonial-text'
        },
        author: {
            type: 'string',
            source: 'html',
            selector: '.testimonial-author'
        },
        imageUrl: {
            type: 'string'
        }
    },
    
    edit: ({ attributes, setAttributes }) => {
        return (
            <div className="testimonial-block">
                <MediaUpload
                    onSelect={media => setAttributes({ imageUrl: media.url })}
                    allowedTypes={['image']}
                    value={attributes.imageUrl}
                    render={({ open }) => (
                        <Button onClick={open}>
                            {attributes.imageUrl ? 
                                <img src={attributes.imageUrl} alt="testimonial" /> : 
                                'Upload Image'
                            }
                        </Button>
                    )}
                />
                
                <RichText
                    tagName="blockquote"
                    value={attributes.testimonialText}
                    onChange={(content) => setAttributes({ testimonialText: content })}
                    placeholder="Enter testimonial text..."
                />
                
                <RichText
                    tagName="cite"
                    value={attributes.author}
                    onChange={(content) => setAttributes({ author: content })}
                    placeholder="Enter author name..."
                />
            </div>
        );
    },

    save: ({ attributes }) => {
        return (
            <div className="testimonial-block">
                {attributes.imageUrl && (
                    <img src={attributes.imageUrl} alt="testimonial" />
                )}
                <blockquote className="testimonial-text">
                    {attributes.testimonialText}
                </blockquote>
                <cite className="testimonial-author">
                    {attributes.author}
                </cite>
            </div>
        );
    }
});
