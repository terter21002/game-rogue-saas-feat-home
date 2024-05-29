import organizationModel from '@/models/organization';
import { removeFromGoogleStorage } from '@/utils/storage';
import { log } from '@repo/logger';
import {
  TApiResponse,
  ZApiRequestPaginated,
  ZOrganizationUpdate,
  ZOrganizationCreate,
  ZSocialItem,
} from '@repo/types';
import { Request, Response, Express } from 'express';
import path from 'path';

export const getOrganizations = async (req: Request, res: Response) => {
  try {
    const params = ZApiRequestPaginated.safeParse(req.params);
    if (params.success) {
      const page = params.data.page || 1;
      const pageSize = params.data.pageSize || 10;
      const items = await organizationModel
        .find({})
        .populate('user')
        .skip((page - 1) * pageSize)
        .limit(pageSize);
      return res.json({
        data: items,
        success: true,
        message: 'success',
      });
    } else {
      return res.status(400).json({
        success: false,
        message: params.error.errors[0].path + ': ' + params.error.errors[0].message,
      });
    }
  } catch (err) {
    log(err);
    return res.status(500).json({
      success: false,
      // @ts-expect-error
      message: err.message,
    });
  }
};

export const createOrganization = async (req: Request, res: Response) => {
  try {
    req.body.userId = String(res.locals.user._id);
    if (req.files) {
      const files = req.files as { [key: string]: Express.Multer.File[] };
      const banner = files['banner']?.[0];
      const image = files['image']?.[0];
      if (banner) {
        req.body.banner = path.join('/uploads', banner.destination).replace(/\\/g, '/');
      }
      if (image) {
        req.body.image = path.join('/uploads', image.destination).replace(/\\/g, '/');
      }
    }
    const payload = ZOrganizationCreate.safeParse(req.body);
    if (payload.success) {
      const item = await organizationModel.create(payload.data);
      await item.populate('user');
      return res.json({
        data: item,
        success: true,
        message: 'success',
      });
    } else {
      return res.status(400).json({
        success: false,
        message: payload.error.errors[0].path + ': ' + payload.error.errors[0].message,
      } as TApiResponse<any>);
    }
  } catch (err) {
    log(err);
    return res.status(500).json({
      success: false,
      // @ts-expect-error
      code: err.code,
      // @ts-expect-error
      message: err.message,
    });
  }
};

export const updateOrganization = async (req: Request, res: Response) => {
  try {
    const item = await organizationModel.findById(req.params.id);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'not found',
      });
    }
    req.body.userId = String(res.locals.user._id);
    if (req.files) {
      const files = req.files as { [key: string]: Express.Multer.File[] };
      const banner = files['banner']?.[0];
      const image = files['image']?.[0];
      if (banner) {
        req.body.banner = path.join('/uploads', banner.destination).replace(/\\/g, '/');
        if (item.banner) await removeFromGoogleStorage({ url: item.banner });
      }
      if (image) {
        req.body.image = path.join('/uploads', image.destination).replace(/\\/g, '/');
        if (item.image) await removeFromGoogleStorage({ url: item.image });
      }
    }
    const payload = ZOrganizationUpdate.safeParse(req.body);
    if (payload.success) {
      await item.updateOne(payload.data);
      return res.json({
        data: item,
        success: true,
        message: 'success',
      });
    } else {
      return res.status(400).json({
        success: false,
        message: payload.error.errors[0].path + ': ' + payload.error.errors[0].message,
      } as TApiResponse<any>);
    }
  } catch (err) {
    log(err);
    return res.status(500).json({
      success: false,
      // @ts-expect-error
      code: err.code,
      // @ts-expect-error
      message: err.message,
    });
  }
};

export const updateOrganizationSocial = async (req: Request, res: Response) => {
  try {
    const organizationId = req.params.id;
    const item = await organizationModel.findById(organizationId);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'not found',
      });
    } else {
      const payload = ZSocialItem.partial({ _id: true, url: true }).safeParse(req.body);
      if (payload.success) {
        const social = item.social || [];
        const { type, url } = payload.data;
        if (!url) {
          const index = social.findIndex((s) => s.type === type);
          if (index !== -1) {
            social.splice(index, 1);
          }
        } else {
          const index = social.findIndex((s) => s.type === type);
          if (index !== -1) {
            social[index].url = url;
          } else {
            social.push({ type, url });
          }
        }
        await item.updateOne({ social });
        return res.json({
          data: item,
          success: true,
          message: 'success',
        });
      } else {
        return res.status(400).json({
          success: false,
          message: payload.error.errors[0].path + ': ' + payload.error.errors[0].message,
        });
      }
    }
  } catch (err) {
    log(err);
    return res.status(500).json({
      success: false,
      // @ts-expect-error
      code: err.code,
      // @ts-expect-error
      message: err.message,
    });
  }
};

export const getOrganization = async (req: Request, res: Response) => {
  const { id } = req.params;
  const item = await organizationModel.findById(id);
  if (!item)
    return res.status(404).json({
      success: false,
      message: 'not found',
    });
  return res.json({
    data: item,
    success: true,
    message: 'success',
  });
};
