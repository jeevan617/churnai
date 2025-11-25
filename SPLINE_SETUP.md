# How to Use Your Spline Scene

You have two options to integrate your `cute_computer_follow_cursor.spline` file:

## Option 1: Export from Spline (Recommended)

1. Open your `.spline` file in the Spline app (https://spline.design)
2. Click **"Export"** in the top right
3. Select **"Code Export"** 
4. Choose **"React"** or **"Public Link"**
5. Copy the URL (it will look like: `https://prod.spline.design/xxxxx/scene.splinecode`)
6. Update `frontend/src/pages/Home.tsx` line 13:
   ```tsx
   <Spline 
     scene="YOUR_SPLINE_URL_HERE"
     style={{ width: '100%', height: '100%' }}
   />
   ```

## Option 2: Use Spline Embed Code

If you have the embed code from Spline:

1. Replace the entire `<Spline />` component with the embed code
2. Make sure to keep the `spline-container` div wrapper

## Current Setup

The app is currently using a placeholder Spline scene. Replace it with your cute computer scene URL to see your custom 3D model!

## Troubleshooting

- **Scene not loading?** Make sure your Spline project is published and the URL is public
- **Performance issues?** Optimize your Spline scene by reducing polygon count
- **Mobile not working?** Some complex Spline scenes may need optimization for mobile devices
