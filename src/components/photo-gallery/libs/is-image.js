// @flow

/**
 * Check if the photo-thumb is an image
 * @module components/photo-gallery/libs/is-image
 */

type Data = {
  thumbnail: string,
  preview: ?string
}

const isImage = (data: Data) => !!(data.thumbnail.match(/(gif|png|jpg|jpeg)$/) && data.preview);

export default isImage;
