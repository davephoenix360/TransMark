import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import * as fs from "fs";
import path from 'path';

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ success: false, message: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    //Check if the \public\uploads exits if it doesn't add it
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');

    const uploadDirExists = await fs.promises.stat(uploadDir).catch(() => null);
    if (!uploadDirExists) {
      await fs.promises.mkdir(uploadDir, { recursive: true });
    }

    const filename = `${Date.now()}-${file.name}`;
    const filepath = path.join(uploadDir, filename);

    await writeFile(filepath, buffer);
    console.log('File saved to', filepath);

    const title = data.get('title');
    const description = data.get('description');
    const createdDate = data.get('createdDate');
    const createdTime = data.get('createdTime');
    const uploadDate = data.get('uploadDate');
    const uploadTime = data.get('uploadTime');

    // Construct the full URL for the uploaded file
    const fileUrl = `/uploads/${filename}`;

    return NextResponse.json({
      success: true,
      message: 'File uploaded successfully',
      transcript: {
        id: Math.random().toString(36).substr(2, 9),
        title,
        description,
        createdDate: `${createdDate} ${createdTime}`,
        uploadDate: `${uploadDate} ${uploadTime}`,
        filePath: fileUrl,
      },
    });
  } catch (error) {
    console.error('Error in upload process:', error);
    return NextResponse.json({ success: false, message: 'Upload failed' }, { status: 500 });
  }
}