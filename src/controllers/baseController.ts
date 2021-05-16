import express = require("express");

export default interface BaseController {
    getDataById: (req: express.Request, res: express.Response) => Promise<void>;
    getData: (req: express.Request, res: express.Response) => Promise<void>;
    addData: (req: express.Request, res: express.Response) => Promise<void>;
    updateData: (req: express.Request, res: express.Response) => Promise<void>;
    deleteData: (req: express.Request, res: express.Response) => Promise<void>;
}