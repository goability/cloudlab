# CloudLab - HogCloud

A modern web application built with React, TypeScript, and Vite.

## Quickstart

### Prerequisites

Before running this project locally, make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js) or **yarn**

You can check your versions by running:
```bash
node --version
npm --version
```

### Installation

1. **Clone the repository** (if you haven't already):
```bash
git clone <repository-url>
cd cloudlab.hogcloud.net
```

2. **Install dependencies**:
```bash
npm install
```

### Running Locally

3. **Start the development server**:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is busy).

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

### Development

- The development server includes hot module replacement (HMR)
- Any changes you make to the source code will automatically refresh the browser
- TypeScript compilation errors will be displayed in both the terminal and browser

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist/` directory.

To preview the production build locally:

```bash
npm run preview
```

## Deployment

### S3 Bucket Setup

1. **Create an S3 bucket** in your AWS account:
   - Go to AWS S3 Console
   - Click "Create bucket"
   - Choose a unique bucket name (e.g., `cloudlab-hogcloud-prod`)
   - Select your preferred region
   - Configure bucket settings as needed

2. **Configure bucket for static website hosting**:
   - Select the bucket and go to "Properties"
   - Scroll down to "Static website hosting"
   - Enable it and set index document to `index.html`
   - Note the website endpoint URL

3. **Set bucket permissions** for public read access:
   - Go to "Permissions" tab
   - Update bucket policy to allow public read access
   - Example policy:
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::your-bucket-name/*"
        }
    ]
}
```

### Deploy with S3 Sync

1. **Build the project**:
```bash
npm run build
```

2. **Sync to S3 bucket**:
```bash
aws s3 sync dist/ s3://your-bucket-name --delete
```

The `--delete` flag removes files from S3 that no longer exist in your local build, ensuring a clean deployment.

3. **Optional: Set cache headers** for better performance:
```bash
aws s3 sync dist/ s3://your-bucket-name --delete --cache-control "max-age=31536000,public"
```

### Automated Deployment

You can create a deployment script in your `package.json`:

```json
{
  "scripts": {
    "deploy": "npm run build && aws s3 sync dist/ s3://your-bucket-name --delete"
  }
}
```

Then deploy with:
```bash
npm run deploy
```

### CloudFront (Optional)

For better performance and HTTPS, consider setting up CloudFront:
- Create a CloudFront distribution
- Set the S3 bucket as origin
- Configure custom domain and SSL certificate
- Update your deployment to invalidate CloudFront cache after sync 

