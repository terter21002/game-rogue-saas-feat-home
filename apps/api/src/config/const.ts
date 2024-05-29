export const isDev = process.env.NODE_ENV === 'development';

export const apiPort = process.env.API_PORT || 8000;

export const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017';

export const jwtSecret = process.env.AUTH_SECRET || 'secret';

export const liveKitApiUrl = process.env.LIVEKIT_API_URL!;

export const liveKitApiKey = process.env.LIVEKIT_API_KEY!;

export const liveKitSecretKey = process.env.LIVEKIT_SECRET_KEY!;

export const stripeSecretKey = process.env.STRIPE_SECRET_KEY!;

export const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export const googleStorageBucketName = process.env.GOOGLE_STORAGE_BUCKET_NAME!;

export const googleServiceAccountString = process.env.GOOGLE_SERVICE_ACCOUNT!;
