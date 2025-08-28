import express from 'express';
import multer from 'multer';
import { documentUpload,handleGenerate } from './../controllers/documentController.js';

const Router = express.Router();
const upload = multer({ dest: 'uploads/' });

Router.post('/upload', upload.single('file'), documentUpload);
Router.post('/summarize',handleGenerate);
export default Router;
