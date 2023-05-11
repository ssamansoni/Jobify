import Jobs from "../models/Jobs.js";
import { StatusCodes } from "http-status-codes";
import { badRequestError, notFoundError, unauthenticatedError} from "../errors/index.js";
import checkPermissions from "../util/checkPermissions.js";
import mongoose from "mongoose";
import moment from "moment";

const createJob = async (req , res) => {
    const {position,company} = req.body;

    if(!position || !company)
    {
        throw new badRequestError("Please provide all values!");
    }
    req.body.createdBy = req.user.userId;   //creating a property to pass the id

    const job = await Jobs.create(req.body)
    res.status(StatusCodes.CREATED).json({job});
}

const getAllJobs = async (req , res) => {

    const {search , status , jobType , sort} = req.query;

    const queryObject = {
        createdBy: req.user.userId,
    }

    if(status && status!=='all')
    {
        queryObject.status = status;
    }

    if(jobType && jobType!=='all')
    {
        queryObject.jobType = jobType;
    }

    if(search)
    {
        queryObject.position = {$regex: search, $options: 'i'}
    }

    let result = Jobs.find(queryObject)

    if(sort==='latest')
    {
        result = result.sort('-createdAt');
    }

    if(sort==='oldest')
    {
        result = result.sort('createdAt');
    }

    if(sort==='a-z')
    {
        result = result.sort('position');
    }

    if(sort==='z-a')
    {
        result = result.sort('-position');
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page-1)*limit;

    result = result.skip(skip).limit(limit);

    const userjobs = await result;

    const totalJobs = await Jobs.countDocuments(queryObject);
    const numOfPages = Math.ceil(totalJobs/limit);

    res.status(StatusCodes.OK).json({userjobs,totalJobs : totalJobs , numOfPages: numOfPages});
}

const deleteJob = async (req , res) => {
    const {id : jobId} = req.params;

    const job = await Jobs.findOne({_id : jobId})

    if(!job)
    {
        throw new notFoundError(`No job with id : ${jobId}`)
    }

    //check permissions & delete

    checkPermissions(req.user,job.createdBy);

    await job.remove();
    res.status(StatusCodes.OK).json({msg : "Job removed successfully..."})
}

const updateJob = async (req , res) => {
    const {id : jobId} = req.params;
    const {company , position} = req.body;

    if(!position || !company)
    {
        throw new badRequestError("Please provide all values!");
    }

    const job = await Jobs.findOne({_id : jobId})

    if(!job)
    {
        throw new notFoundError(`No job with id : ${jobId}`)
    }

    //check permissions & update

    checkPermissions(req.user,job.createdBy);

    const updatedJob = await Jobs.findOneAndUpdate({_id: jobId},req.body , {new: true , runValidators : true});
    res.status(StatusCodes.OK).json({updatedJob});
}

const showStats = async (req , res) => {
    let stats = await Jobs.aggregate([
        { $match : {createdBy: mongoose.Types.ObjectId(req.user.userId)}},
        { $group : {_id: '$status', count: {$sum: 1}}},
    ])

    stats = stats.reduce((acc,curr)=>{
        const {_id: profile , count } = curr;
        acc[profile] = count;
        return acc;
    },{})

    const defaultStats = {
        'Test' : stats.Test || 0,
        'Interview' : stats.Interview || 0,
        'Pending' : stats.Pending || 0,
        'Declined' : stats.Declined || 0,
        'Offer' : stats.Offer || 0
    }

    let weeklyApplications = await Jobs.aggregate([
        {$match:{createdBy:mongoose.Types.ObjectId(req.user.userId)}},
        {$group: {
            _id: {year : { $year : '$createdAt'}, week: {$week: '$createdAt'}},
            count: { $sum: 1},
        }},
        {$sort : {'_id.year':-1, '_id.week': -1}},
        {$limit : 5}
    ])

    weeklyApplications = weeklyApplications.map((item)=>{
        const {_id:{year,week},count} = item
        let s_date = moment().year(year).week(week).day('monday').format('DD MMM');
        let e_date = moment().year(year).week(week+1).day('sunday').format('DD MMM');
        let date = s_date.concat("-",e_date);
        return { date, count }
    }).reverse();

    res.status(StatusCodes.OK).json({defaultStats,weeklyApplications});
}

export { createJob , getAllJobs , deleteJob , updateJob , showStats};
