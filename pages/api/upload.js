import cloudinary from 'cloudinary';
import multiparty from 'multiparty';
import fs from 'fs';
import { mongooseConnect } from '@/lib/mongoose';
import { isAdminRequest } from './auth/[...nextauth]';

cloudinary.config({ 
  cloud_name: 'dp3imi0w7', 
  api_key: '882252371254843', 
  api_secret: 'RfJoNh3uzglzHwPKWNzJE_0ldUE' 
});

export default async function handle(req, res) {
  await mongooseConnect();
  await isAdminRequest(req, res);

  try {
    const form = new multiparty.Form();
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    console.log('length:', files.file.length);

    const links = [];

    for (const file of files.file) {
      const result = await cloudinary.v2.uploader.upload(file.path, {
        folder: 'intercolegiales',
        resource_type: 'auto',
        tags: 'intercolegiales',
      });

      const link = result.secure_url;
      links.push(link);
    }

    res.json({ links });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const config = {
  api: { bodyParser: false },
};
