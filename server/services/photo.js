'use strict'
/**
 * Module dependencies.
 */

import mongoose from 'mongoose'
import photoModel from '../models/photo'

photoModel.init()

const Photo = mongoose.model('Photo')

const addPhoto = async (photoData) => {
  const photo = new Photo({
    fileName: photoData.fileName,
    user: photoData.userId
  })
  return photo.save()
}

export default {
  addPhoto
}
