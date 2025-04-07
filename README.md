# DevConnect

![image](https://github.com/user-attachments/assets/2c4a7d7f-30e2-49cb-a8c0-74fca0a256f7)


A modern, responsive developer-focused chat application built with React and TypeScript. DevConnect provides a Discord-inspired interface for team communication with channels, direct messages, code sharing, media uploads, and more.

## 🌟 Features

- **Dark/Light Mode** - Toggle between dark and light themes
- **Channels** - Public topic-based chat rooms for team discussions
- **Direct Messages** - Private one-on-one communication
- **Code Blocks** - Syntax highlighting for code snippets
- **Emoji Reactions** - Interactive reactions to messages
- **Media Sharing** - Upload and share images and GIFs
- **Real-time Notifications** - Stay updated with unread message counters
- **User Search** - Easily find team members to start conversations
- **Responsive Design** - Works on desktop and mobile devices
- **Interactive UI** - Rich animations and transitions for a polished experience

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn
- React 18.x

## 🚀 Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/devconnect.git
   cd devconnect
   ```

2. Install dependencies:
   ```bash
   npm install
   # or with yarn
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or with yarn
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

## 🧱 Project Structure

```
/devconnect
  /components
    DevConnectApp.tsx  - Main application component
  /styles
    globals.css        - Global styles
  /public
    /images            - Static images
  /pages
    _app.tsx           - Next.js app wrapper
    index.tsx          - Main page
  /types
    index.ts           - TypeScript type definitions
```

## 🔧 Technologies Used

- **React** - UI library
- **TypeScript** - Type-safe JavaScript
- **Next.js** - React framework
- **Lucide React** - Icon library
- **TailwindCSS** - Utility-first CSS framework

## 💻 Usage

### Channels

DevConnect comes with several pre-configured channels:
- **#general** - For general team discussions
- **#frontend** - For frontend development topics
- **#backend** - For backend development topics
- **#devops** - For deployment and infrastructure discussions
- **#random** - For non-work related conversations

### Sharing Code

To share code snippets, surround your code with triple backticks:

```
```javascript
function example() {
  console.log('Hello DevConnect!');
}
```
```

### Emoji Reactions

Click the "Add reaction" button below any message to add emoji reactions. You can also click on existing reactions to add your own.

### Uploading Media

Click the paperclip icon in the message input to upload images or GIFs.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📧 Contact

Project Link: [https://github.com/yourusername/devconnect](https://github.com/yourusername/devconnect)

## 🙏 Acknowledgements

- [Lucide Icons](https://lucide.dev/)
- [Next.js](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
