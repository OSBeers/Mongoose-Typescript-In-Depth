import { NextFunction, Request, Response } from 'express';
import mongoose, { Document, Model } from 'mongoose';

const create = (model: Model<any>) => (req: Request, res: Response, next: NextFunction) => {
    console.log('Creating doc for' + model.modelName);

    const doc = new model({
        _id: new mongoose.Types.ObjectId(),
        ...req.body
    });

    return doc
        .save()
        .then((result: any) => res.status(201).json({ result }))
        .catch((error: any) => res.status(500).json({ error }));
};

const getAll = (model: Model<any>, populate?: string[]) => (req: Request, res: Response, next: NextFunction) => {
    console.log('getting all for' + model.modelName);

    model
        .find<Document>()
        .populate(populate || [])
        .then((results) => {
            console.log(results);
            return res.status(200).json({ results });
        })
        .catch((error) => {
            console.log(error);
            return res.status(400).json({ error });
        });
};

const get = (model: Model<any>, populate?: string[]) => (req: Request, res: Response, next: NextFunction) => {
    console.log('getting doc for' + model.modelName + 'by ID');

    const id = req.params.id;

    model
        .findOne<Document>({ _id: id })
        .populate(populate || [])
        .then((result) => {
            if (result) {
                console.log(result);
                return res.status(200).json({ result });
            } else {
                console.log(result);
                return res.status(404).json({ message: 'not found' });
            }
        })
        .catch((error) => {
            console.log(error);
            return res.status(400).json({ error });
        });
};

const update = (model: Model<any>, populate?: string[]) => (req: Request, res: Response, next: NextFunction) => {
    console.log('updating doc for' + model.modelName + 'by ID');

    const id = req.params.id;

    model
        .findOne<Document>({ _id: id })
        .populate(populate || [])
        .then((result) => {
            if (result) {
                result.set(req.body);

                return result.save().then((result) => {
                    console.log(result);
                    return res.status(200).json({ result });
                });
            } else {
                console.log(result);
                return res.status(404).json({ message: 'not found' });
            }
        })
        .catch((error) => {
            console.log(error);
            return res.status(400).json({ error });
        });
};

export default { create, getAll, get, update };
