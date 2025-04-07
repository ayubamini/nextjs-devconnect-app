"use client";

import React, { useState, useEffect } from "react";
import {
  MessageSquare,
  Hash,
  Bell,
  Code,
  User,
  Moon,
  Sun,
  Send,
  Paperclip,
  Menu,
  MoreHorizontal,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { Rubik } from "next/font/google";
const rubik = Rubik({ subsets: ["latin"], variable: "--font-rubik" });

const customStyles = `
@media (min-width: 475px) {
  .xs\\:flex-row {
  flex-direction: row;
  }
  .xs\\:items-baseline {
  align-items: baseline;
  }
  .xs\\:space-x-2 > * + * {
  margin-left: 0.5rem;
  }
  }
   
  .fade-in {
  animation: fadeIn 0.3s ease-in-out;
  }
  
  .slide-in {
  animation: slideIn 0.3s ease-in-out;
  }
  
  .pop-in {
  animation: popIn 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  
  .pulse {
  animation: pulse 2s infinite;
  }
  
  @keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
  }
  
  @keyframes slideIn {
  from { transform: translateX(-20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes popIn {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
  }
  
  @keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.6; }
  100% { opacity: 1; }
  }
  
  .transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  }
  
  .transition-transform {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  }
  
  .transition-opacity {
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  }
  
  .hover-scale {
  transition: transform 0.2s ease;
  }
  
  .hover-scale:hover {
  transform: scale(1.05);
  }
  
  .sidebar-transition {
  transition: transform 0.3s ease, opacity 0.3s ease;
  }
  
  .channel-notification {
    transition: all 0.2s ease;
    opacity: 0.7;
  }
  
  .channel-notification:hover {
    opacity: 1;
  }`;

type User = {
  id: string;
  name: string;
  username: string;
  avatar: string;
  isOnline: boolean;
  lastActive?: string;
  followers: number;
  following: number;
  posts: number;
  bio?: string;
};

// Mock data
const createMockUser = (
  id: string,
  name: string,
  username: string,
  isOnline: boolean = false
): User => ({
  id,
  name,
  username: `@${username}`,
  avatar: `https://picsum.photos/seed/${id}/100/100`,
  isOnline,
  lastActive: isOnline
    ? undefined
    : ["Just now", "5m ago", "30m ago", "2h ago", "1d ago"][
        Math.floor(Math.random() * 5)
      ],
  followers: Math.floor(Math.random() * 5000),
  following: Math.floor(Math.random() * 500),
  posts: Math.floor(Math.random() * 100),
  bio:
    id === "current-user"
      ? "Digital designer and photographer based in San Francisco, passionate about creating beautiful interfaces and capturing moments."
      : undefined,
});

const currentUser: User = createMockUser(
  "current-user",
  "Alex Johnson",
  "alexj",
  true
);

const mockUsers: User[] = [
  createMockUser("user1", "Sarah Williams", "sarah_w", true),
  createMockUser("user2", "Mark Davis", "markd", false),
  createMockUser("user3", "Emma Thompson", "emmat", true),
  createMockUser("user4", "John Smith", "john_smith", false),
  createMockUser("user5", "Melissa Chen", "melc", true),
  createMockUser("user6", "David Wilson", "davidw", false),
  createMockUser("user7", "Sophie Moore", "sophiem", true),
  createMockUser("user8", "James Taylor", "jamest", false),
  createMockUser("user9", "Michael Johnson", "mjohnson", true),
  createMockUser("user10", "Jessica Brown", "jbrown", false),
  createMockUser("user11", "Daniel Lee", "dlee", true),
  createMockUser("user12", "Olivia Martinez", "omartinez", false),
  createMockUser("user13", "William Garcia", "wgarcia", true),
  createMockUser("user14", "Ava Robinson", "arobinson", false),
  createMockUser("user15", "Ethan Clark", "eclark", true),
  createMockUser("user16", "Noah Wright", "nwright", false),
  createMockUser("user17", "Isabella Lopez", "ilopez", true),
  createMockUser("user18", "Sophia Hill", "shill", true),
  createMockUser("user19", "Mason Scott", "mscott", false),
  createMockUser("user20", "Mia Green", "mgreen", true),
];

type Reaction = {
  emoji: string;
  count: number;
  users: User[];
  reacted?: boolean;
};

type Message = {
  id: string;
  sender: User;
  content: string;
  timestamp: string;
  isCode?: boolean;
  parentId?: string | null;
  reactions?: Reaction[];
  isNew?: boolean;
  media?: {
    type: "image" | "gif";
    url: string;
    alt?: string;
  };
};

type Channel = {
  id: string;
  name: string;
  unread: number;
};

type ChannelMessages = {
  [channelId: string]: Message[];
};

const channelMessages: ChannelMessages = {
  general: [
    {
      id: "1",
      sender: mockUsers[0],
      content:
        "Hey team, I just pushed a fix for that authentication bug we were seeing in production",
      timestamp: "10:30 AM",
      reactions: [
        {
          emoji: "👍",
          count: 3,
          users: [mockUsers[1], mockUsers[2], mockUsers[4]],
          reacted: false,
        },
        {
          emoji: "🎉",
          count: 1,
          users: [mockUsers[3]],
          reacted: false,
        },
      ],
      parentId: null,
    },
    {
      id: "2",
      sender: mockUsers[2],
      content: "Great job! What was the issue?",
      timestamp: "10:32 AM",
      parentId: "1",
    },
    {
      id: "3",
      sender: mockUsers[0],
      content: `The problem was in our JWT validation. Here's the fix:`,
      timestamp: "10:35 AM",
      parentId: "1",
    },
    {
      id: "4",
      sender: mockUsers[0],
      content: "const verifyToken = (token)",
      timestamp: "10:36 AM",
      isCode: true,
      parentId: "1",
    },
    {
      id: "5",
      sender: mockUsers[4],
      content:
        "Nice catch! Should we add more comprehensive tests for token validation?",
      timestamp: "10:40 AM",
      parentId: "1",
    },
  ],
  frontend: [
    {
      id: "6",
      sender: mockUsers[6],
      content:
        "Anyone have time to review my PR for the new notification system?",
      timestamp: "11:15 AM",
      parentId: null,
    },
    {
      id: "7",
      sender: mockUsers[1],
      content:
        "Here's a screenshot of the new dashboard UI we're working on. What do you think?",
      timestamp: "11:22 AM",
      parentId: null,
      media: {
        type: "image",
        url: "https://picsum.photos/seed/dashboard/800/500",
        alt: "Dashboard preview",
      },
    },
    {
      id: "8",
      sender: mockUsers[3],
      content:
        "Love the new layout! Could we add a dark mode toggle in the header?",
      timestamp: "11:30 AM",
      parentId: "7",
    },
    {
      id: "9",
      sender: mockUsers[6],
      content: "I can help implement the dark mode. I'll create a task for it.",
      timestamp: "11:35 AM",
      parentId: "7",
    },
  ],
  backend: [
    {
      id: "10",
      sender: mockUsers[4],
      content:
        "We need to optimize the user query in the API. It's taking too long for large datasets.",
      timestamp: "09:45 AM",
      parentId: null,
    },
    {
      id: "11",
      sender: mockUsers[0],
      content:
        "I've been looking into this. The N+1 query issue is causing the slowdown.",
      timestamp: "09:50 AM",
      parentId: "10",
    },
    {
      id: "12",
      sender: mockUsers[0],
      content: `Here's the SQL explain I ran:
EXPLAIN ANALYZE SELECT users.*, 
profiles.bio, 
profiles.avatar 
FROM users 
LEFT JOIN profiles ON users.id = profiles.user_id 
WHERE users.status = 'active' 
ORDER BY users.created_at DESC 
LIMIT 50;`,
      timestamp: "09:55 AM",
      parentId: "10",
      isCode: true,
    },
  ],
  devops: [
    {
      id: "13",
      sender: mockUsers[7],
      content: "Found this funny GIF that describes our deployment process 😂",
      timestamp: "11:45 AM",
      parentId: null,
      media: {
        type: "gif",
        url: "https://picsum.photos/seed/gif-sample/400/300",
        alt: "Funny deployment process GIF",
      },
    },
    {
      id: "14",
      sender: mockUsers[5],
      content:
        "Too accurate! Let's discuss how we can streamline our CI/CD pipeline in the next sprint planning.",
      timestamp: "11:50 AM",
      parentId: "13",
    },
    {
      id: "15",
      sender: mockUsers[2],
      content:
        "I created a new Kubernetes cluster configuration for our staging environment.",
      timestamp: "12:15 PM",
      parentId: null,
    },
  ],
  random: [
    {
      id: "16",
      sender: mockUsers[3],
      content: "Anyone going to the tech conference next month?",
      timestamp: "10:05 AM",
      parentId: null,
    },
    {
      id: "17",
      sender: mockUsers[5],
      content: "I'll be there! Looking forward to the workshops on AI and ML.",
      timestamp: "10:12 AM",
      parentId: "16",
    },
    {
      id: "18",
      sender: mockUsers[1],
      content:
        "Lunch break! Check out this amazing food from the new place across the street.",
      timestamp: "12:30 PM",
      parentId: null,
      media: {
        type: "image",
        url: "https://picsum.photos/seed/lunch/600/400",
        alt: "Delicious lunch",
      },
    },
  ],
};

const initialDirectMessages: { [userId: string]: Message[] } = {
  user1: [
    {
      id: "dm1-1",
      sender: mockUsers[0],
      content: "Hey Alex, how's the new design coming along?",
      timestamp: "09:15 AM",
      parentId: null,
    },
    {
      id: "dm1-2",
      sender: currentUser,
      content: "It's going well! I'll share a preview with you later today.",
      timestamp: "09:20 AM",
      parentId: null,
    },
    {
      id: "dm1-3",
      sender: mockUsers[0],
      content: "Sounds great! Looking forward to it.",
      timestamp: "09:22 AM",
      parentId: null,
    },
  ],
  user3: [
    {
      id: "dm3-1",
      sender: mockUsers[2],
      content: "Did you check out the new React 19 docs?",
      timestamp: "Yesterday",
      parentId: null,
    },
    {
      id: "dm3-2",
      sender: currentUser,
      content: "Not yet, but I heard the new hooks API is amazing!",
      timestamp: "Yesterday",
      parentId: null,
    },
    {
      id: "dm3-3",
      sender: mockUsers[2],
      content: "It is! The new suspense features are game-changing.",
      timestamp: "Yesterday",
      parentId: null,
    },
  ],
  user5: [
    {
      id: "dm5-1",
      sender: currentUser,
      content: "Hey Melissa, can you review my PR when you get a chance?",
      timestamp: "2 days ago",
      parentId: null,
    },
    {
      id: "dm5-2",
      sender: mockUsers[4],
      content: "Sure thing! I'll look at it this afternoon.",
      timestamp: "2 days ago",
      parentId: null,
    },
  ],
  user7: [
    {
      id: "dm7-1",
      sender: mockUsers[6],
      content: "Can you help me with the UI animation issue?",
      timestamp: "Yesterday",
      parentId: null,
    },
    {
      id: "dm7-2",
      sender: currentUser,
      content: "Of course! Can you share your screen in the next meeting?",
      timestamp: "Yesterday",
      parentId: null,
    },
  ],
  user9: [
    {
      id: "dm9-1",
      sender: mockUsers[8],
      content: "The deployment pipeline is broken again 😩",
      timestamp: "10:45 AM",
      parentId: null,
    },
    {
      id: "dm9-2",
      sender: currentUser,
      content: "Let me take a look. What's the error message?",
      timestamp: "10:47 AM",
      parentId: null,
    },
    {
      id: "dm9-3",
      sender: mockUsers[8],
      content: "Something about missing dependencies in the build stage",
      timestamp: "10:50 AM",
      parentId: null,
    },
    {
      id: "dm9-4",
      sender: currentUser,
      content: "Ah, I think I know what's happening. Let me fix it.",
      timestamp: "10:52 AM",
      parentId: null,
    },
  ],
  user11: [
    {
      id: "dm11-1",
      sender: mockUsers[10],
      content: "Are you joining the standup today?",
      timestamp: "08:30 AM",
      parentId: null,
    },
    {
      id: "dm11-2",
      sender: currentUser,
      content: "Yes, I'll be there in 5 minutes.",
      timestamp: "08:31 AM",
      parentId: null,
    },
  ],
};

const channels: Channel[] = [
  { id: "general", name: "general", unread: 0 },
  { id: "frontend", name: "frontend", unread: 3 },
  { id: "backend", name: "backend", unread: 0 },
  { id: "devops", name: "devops", unread: 1 },
  { id: "random", name: "random", unread: 0 },
];

const getUserById = (userId: string): User => {
  if (userId === "current-user") return currentUser;
  const user = mockUsers.find((user) => user.id === userId);
  if (!user) throw new Error(`User with ID ${userId} not found`);
  return user;
};

export default function DevConnectApp() {
  const [darkMode, setDarkMode] = useState(true);
  const [messages, setMessages] = useState<{ [key: string]: Message[] }>(
    channelMessages
  );
  const [directMessages, setDirectMessages] = useState<{
    [userId: string]: Message[];
  }>(initialDirectMessages);
  const [newMessage, setNewMessage] = useState("");
  const [activeView, setActiveView] = useState<"channel" | "dm">("channel");
  const [activeChannel, setActiveChannel] = useState("general");
  const [activeDMUser, setActiveDMUser] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [themeChanging, setThemeChanging] = useState(false);
  const [messagesRef, setMessagesRef] = useState<HTMLDivElement | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const [dmListExpanded, setDmListExpanded] = useState(true);
  const [showUserSearch, setShowUserSearch] = useState(false);
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [unreadDMs, setUnreadDMs] = useState<{ [userId: string]: number }>({
    user1: 2,
    user6: 1,
    user9: 3,
    user11: 1,
    user19: 2,
  });
  const [activeEmojiPicker, setActiveEmojiPicker] = useState<string | null>(
    null
  );
  const [totalUnreadDMs, setTotalUnreadDMs] = useState<number>(0);
  const [notificationBadgeVisible, setNotificationBadgeVisible] =
    useState<boolean>(true);

  const commonEmojis = [
    "👍",
    "👎",
    "❤️",
    "🔥",
    "🎉",
    "🙌",
    "👀",
    "🚀",
    "😄",
    "😂",
    "🤔",
    "👏",
  ];

  useEffect(() => {
    if (messagesRef) {
      messagesRef.scrollTop = messagesRef.scrollHeight;
    }
  }, [messages, activeChannel, activeDMUser, messagesRef]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        activeEmojiPicker &&
        event.target instanceof Element &&
        !event.target.closest(".emoji-picker") &&
        !event.target.closest(".reaction-button")
      ) {
        setActiveEmojiPicker(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeEmojiPicker]);

  useEffect(() => {
    const total = Object.values(unreadDMs).reduce(
      (sum, count) => sum + count,
      0
    );
    setTotalUnreadDMs(total);

    if (total > 0 && !notificationBadgeVisible) {
      setNotificationBadgeVisible(true);
    }
  }, [unreadDMs]);

  const openProfileMenu = () => {
    if (profileMenuTimeoutRef.current) {
      clearTimeout(profileMenuTimeoutRef.current);
      profileMenuTimeoutRef.current = null;
    }
    setProfileMenuOpen(true);
  };

  const closeProfileMenu = () => {
    profileMenuTimeoutRef.current = setTimeout(() => {
      setProfileMenuOpen(false);
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (profileMenuTimeoutRef.current) {
        clearTimeout(profileMenuTimeoutRef.current);
      }
    };
  }, []);

  const handleChannelChange = (channelId: string) => {
    setActiveView("channel");
    setActiveChannel(channelId);
    setActiveDMUser(null);

    const updatedChannels = channels.map((channel) =>
      channel.id === channelId ? { ...channel, unread: 0 } : channel
    );
    setSidebarOpen(false);
  };

  const handleDMUserChange = (userId: string) => {
    setActiveView("dm");
    setActiveDMUser(userId);
    setActiveChannel("");

    // Mark DMs as read
    if (unreadDMs[userId]) {
      setUnreadDMs((prev) => ({
        ...prev,
        [userId]: 0,
      }));
    }

    if (!directMessages[userId]) {
      setDirectMessages((prev) => ({
        ...prev,
        [userId]: [],
      }));
    }

    setSidebarOpen(false);
  };

  const toggleTheme = () => {
    setThemeChanging(true);
    setTimeout(() => {
      setDarkMode(!darkMode);
      setTimeout(() => {
        setThemeChanging(false);
      }, 50);
    }, 150);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === "string") {
          setFilePreview(event.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const clearSelectedFile = () => {
    setSelectedFile(null);
    setFilePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const openFileSelector = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const getFilteredUsers = () => {
    if (!userSearchQuery) return mockUsers;

    return mockUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(userSearchQuery.toLowerCase())
    );
  };

  const toggleUserSearch = () => {
    setShowUserSearch(!showUserSearch);
    if (!showUserSearch) {
      setUserSearchQuery("");
    }
  };

  const startNewDM = (userId: string) => {
    handleDMUserChange(userId);
    setShowUserSearch(false);
    setUserSearchQuery("");
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "" && !selectedFile) {
      return;
    }

    const isCode: boolean = newMessage.includes("{{code}}");
    const content: string = isCode
      ? newMessage.replace(/{{code}}[\w]*\n|{{code}}/g, "")
      : newMessage;

    if (selectedFile) {
      setIsUploading(true);
    }

    const message: Message = {
      id: Date.now().toString(),
      sender: currentUser,
      content: content.trim(),
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isCode: isCode,
      parentId: null,
      isNew: true,
    };

    if (selectedFile && filePreview) {
      const isGif = selectedFile.type === "image/gif";

      message.media = {
        type: isGif ? "gif" : "image",
        url: filePreview,
        alt: selectedFile.name,
      };

      setTimeout(() => {
        setIsUploading(false);
      }, 1000);
    }

    if (activeView === "channel") {
      setMessages((prev) => ({
        ...prev,
        [activeChannel]: [...(prev[activeChannel] || []), message],
      }));
    } else if (activeView === "dm" && activeDMUser) {
      setDirectMessages((prev) => ({
        ...prev,
        [activeDMUser]: [...(prev[activeDMUser] || []), message],
      }));
    }

    setNewMessage("");
    clearSelectedFile();

    setTimeout(() => {
      if (activeView === "channel") {
        setMessages((prev) => {
          const updatedChannelMessages = prev[activeChannel].map(
            (msg: Message) =>
              msg.id === message.id ? { ...msg, isNew: false } : msg
          );

          return {
            ...prev,
            [activeChannel]: updatedChannelMessages,
          };
        });
      } else if (activeView === "dm" && activeDMUser) {
        setDirectMessages((prev) => {
          const updatedDMMessages = prev[activeDMUser].map((msg: Message) =>
            msg.id === message.id ? { ...msg, isNew: false } : msg
          );

          return {
            ...prev,
            [activeDMUser]: updatedDMMessages,
          };
        });
      }
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleOverlayClick = () => {
    if (sidebarOpen) setSidebarOpen(false);
    if (activeEmojiPicker) setActiveEmojiPicker(null);
  };

  const toggleEmojiPicker = (messageId: string) => {
    if (activeEmojiPicker === messageId) {
      setActiveEmojiPicker(null);
    } else {
      setActiveEmojiPicker(messageId);
    }
  };

  const addReaction = (messageId: string, emoji: string) => {
    console.log(`Adding/toggling reaction ${emoji} to message ${messageId}`);

    if (activeView === "channel") {
      setMessages((prev) => {
        const channelMessages = [...prev[activeChannel]];
        const messageIndex = channelMessages.findIndex(
          (msg) => msg.id === messageId
        );

        if (messageIndex === -1) {
          console.log("Message not found");
          return prev;
        }

        const message = JSON.parse(
          JSON.stringify(channelMessages[messageIndex])
        );
        console.log("Original message:", message);

        if (!message.reactions) {
          console.log("No reactions yet, creating first one");
          message.reactions = [
            {
              emoji,
              count: 1,
              users: [currentUser],
              reacted: true,
            },
          ];
        } else {
          const reactionIndex = message.reactions.findIndex(
            (r: Reaction) => r.emoji === emoji
          );

          if (reactionIndex === -1) {
            console.log("New emoji reaction type");
            message.reactions.push({
              emoji,
              count: 1,
              users: [currentUser],
              reacted: true,
            });
          } else {
            console.log("Existing emoji reaction");
            const reaction = message.reactions[reactionIndex];
            const hasReacted = reaction.users.some(
              (u: User) => u.id === currentUser.id
            );

            if (hasReacted) {
              console.log("User already reacted, removing reaction");
              reaction.count--;
              reaction.users = reaction.users.filter(
                (u: User) => u.id !== currentUser.id
              );
              reaction.reacted = false;

              if (reaction.count === 0) {
                console.log("No users left, removing entire reaction");
                message.reactions = message.reactions.filter(
                  (r: Reaction) => r.emoji !== emoji
                );
              }
            } else {
              console.log("User hasn't reacted, adding reaction");
              reaction.count++;
              reaction.users.push(currentUser);
              reaction.reacted = true;
            }
          }
        }

        console.log("Updated message:", message);
        channelMessages[messageIndex] = message;

        return {
          ...prev,
          [activeChannel]: channelMessages,
        };
      });
    } else if (activeView === "dm" && activeDMUser) {
      setDirectMessages((prev) => {
        const dmMessages = [...prev[activeDMUser]];
        const messageIndex = dmMessages.findIndex(
          (msg) => msg.id === messageId
        );

        if (messageIndex === -1) return prev;

        const message = JSON.parse(JSON.stringify(dmMessages[messageIndex]));

        if (!message.reactions) {
          message.reactions = [
            {
              emoji,
              count: 1,
              users: [currentUser],
              reacted: true,
            },
          ];
        } else {
          const reactionIndex = message.reactions.findIndex(
            (r: Reaction) => r.emoji === emoji
          );

          if (reactionIndex === -1) {
            message.reactions.push({
              emoji,
              count: 1,
              users: [currentUser],
              reacted: true,
            });
          } else {
            const reaction = message.reactions[reactionIndex];
            const hasReacted = reaction.users.some(
              (u: User) => u.id === currentUser.id
            );

            if (hasReacted) {
              reaction.count--;
              reaction.users = reaction.users.filter(
                (u: User) => u.id !== currentUser.id
              );
              reaction.reacted = false;

              if (reaction.count === 0) {
                message.reactions = message.reactions.filter(
                  (r: Reaction) => r.emoji !== emoji
                );
              }
            } else {
              reaction.count++;
              reaction.users.push(currentUser);
              reaction.reacted = true;
            }
          }
        }

        dmMessages[messageIndex] = message;

        return {
          ...prev,
          [activeDMUser]: dmMessages,
        };
      });
    }

    setActiveEmojiPicker(null);
  };

  const handleReactionClick = (messageId: string, emoji: string) => {
    addReaction(messageId, emoji);
  };

  const getCurrentMessages = () => {
    if (activeView === "channel") {
      return messages[activeChannel] || [];
    } else if (activeView === "dm" && activeDMUser) {
      return directMessages[activeDMUser] || [];
    }
    return [];
  };

  const getActiveDMUserDetails = (): User | null => {
    if (activeView !== "dm" || !activeDMUser) return null;
    return getUserById(activeDMUser);
  };

  const getUsersWithDMs = () => {
    return Object.keys(directMessages).map((userId) => ({
      user: getUserById(userId),
      unread: unreadDMs[userId] || 0,
      lastMessage:
        directMessages[userId].length > 0
          ? directMessages[userId][directMessages[userId].length - 1]
          : null,
    }));
  };

  const receiveNewMessage = (userId: string, content: string) => {
    const sender = getUserById(userId);

    const newMessage: Message = {
      id: `dm-${Date.now()}`,
      sender: sender,
      content: content,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      parentId: null,
      isNew: true,
    };

    setDirectMessages((prev) => ({
      ...prev,
      [userId]: [...(prev[userId] || []), newMessage],
    }));

    if (!(activeView === "dm" && activeDMUser === userId)) {
      setUnreadDMs((prev) => ({
        ...prev,
        [userId]: (prev[userId] || 0) + 1,
      }));

      setNotificationBadgeVisible(true);
    }
  };

  // Main render
  return (
    <div
      className={`${rubik.className} h-screen w-full flex flex-col transition-colors duration-300 
    ${darkMode ? "bg-slate-900 text-slate-100" : "bg-slate-50 text-slate-800"} 
    ${themeChanging ? "opacity-95" : "opacity-100"}`}
    >
      <style>{customStyles}</style>
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-0 fade-in"
          onClick={handleOverlayClick}
        ></div>
      )}

      <header
        className={`py-2 px-4 flex items-center justify-between border-b transition-colors duration-300 ${darkMode ? "border-slate-700 bg-slate-800" : "border-slate-200 bg-white"}`}
      >
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`p-1 rounded md:hidden transition-transform hover-scale ${darkMode ? "hover:bg-slate-700" : "hover:bg-slate-200"}`}
          >
            <MessageSquare className="h-5 w-5" />
          </button>
          <div
            className="flex items-center cursor-pointer transition-all duration-300 hover:scale-105 group"
            title="DevConnect"
          >
            <div className="relative">
              <Code
                className={`h-7 w-7 text-indigo-500 ${darkMode ? "group-hover:text-white" : "group-hover:text-gray-800"} transition-all duration-300 group-hover:rotate-12 group-hover:scale-110`}
              />
            </div>
            <h1 className="text-xl font-bold tracking-tight ml-1 group-hover:text-indigo-400 transition-all duration-300">
              DevConnect
              <span className="text-indigo-500 group-hover:animate-pulse">
                .
              </span>
            </h1>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${darkMode ? "hover:bg-slate-700" : "hover:bg-slate-200"}`}
          >
            {darkMode ? (
              <Sun className="h-5 w-5 transition-transform duration-300 hover:text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 transition-transform duration-300 hover:text-indigo-600" />
            )}
          </button>
          <button
            className="relative p-1 transition-all duration-300 hover:scale-110"
            title="Direct Messages"
            onClick={() => {
              if (totalUnreadDMs > 0) {
                const firstUnreadUser = Object.keys(unreadDMs).find(
                  (userId) => unreadDMs[userId] > 0
                );
                if (firstUnreadUser) {
                  handleDMUserChange(firstUnreadUser);
                }
              }
            }}
          >
            <Bell className="h-5 w-5 text-slate-400 hover:text-indigo-500 transition-all duration-300" />
            {totalUnreadDMs > 0 && notificationBadgeVisible && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-indigo-500 text-white text-xs flex items-center justify-center pop-in">
                {totalUnreadDMs > 99 ? "99+" : totalUnreadDMs}
              </span>
            )}
          </button>

          <div
            className="relative"
            onMouseEnter={openProfileMenu}
            onMouseLeave={closeProfileMenu}
          >
            <div
              className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white overflow-hidden transition-all duration-300 hover:scale-110 cursor-pointer ring-2 ring-indigo-500 ring-opacity-50 hover:ring-opacity-100"
              title={currentUser.name}
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="h-full w-full object-cover"
              />
            </div>

            {profileMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 rounded-lg shadow-lg z-50 fade-in">
                <div
                  className={`rounded-lg overflow-hidden ${darkMode ? "bg-slate-800 border border-slate-700" : "bg-white border border-slate-200"} shadow-xl`}
                >
                  <div className="p-3 border-b border-slate-700">
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 rounded-full overflow-hidden">
                        <img
                          src={currentUser.avatar}
                          alt={currentUser.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-md">
                          {currentUser.name}
                        </div>
                        <div className="text-sm text-slate-400">
                          {currentUser.username}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <button
                      className={`w-full text-left p-2 rounded transition-colors text-sm ${darkMode ? "hover:bg-slate-700" : "hover:bg-slate-100"} flex items-center space-x-2`}
                    >
                      <User className="h-4 w-4 text-indigo-500" />
                      <span>Profile</span>
                    </button>
                    <button
                      className={`w-full text-left p-2 rounded transition-colors text-sm ${darkMode ? "hover:bg-slate-700" : "hover:bg-slate-100"} flex items-center space-x-2`}
                    >
                      <Code className="h-4 w-4 text-indigo-500" />
                      <span>Your Projects</span>
                    </button>
                    <button
                      className={`w-full text-left p-2 rounded transition-colors text-sm ${darkMode ? "hover:bg-slate-700" : "hover:bg-slate-100"} flex items-center space-x-2`}
                    >
                      <Bell className="h-4 w-4 text-indigo-500" />
                      <span>Notification Settings</span>
                    </button>
                    <div className="my-1 border-t border-slate-700"></div>
                    <button
                      className={`w-full text-left p-2 rounded transition-colors text-sm text-red-400 hover:text-red-500 ${darkMode ? "hover:bg-slate-700" : "hover:bg-slate-100"} flex items-center space-x-2`}
                    >
                      <svg
                        className="h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <nav
          className={`sidebar-transition md:block absolute md:relative z-10 w-64 h-full md:h-auto flex-shrink-0 transition-colors duration-300
${sidebarOpen ? "block translate-x-0 opacity-100" : "hidden -translate-x-4 md:translate-x-0 opacity-0 md:opacity-100"} 
${darkMode ? "bg-slate-800" : "bg-white"} border-r ${darkMode ? "border-slate-700" : "border-slate-200"}`}
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h2
                className="text-xs font-semibold uppercase tracking-wider text-slate-400 cursor-pointer"
                onClick={() => setDmListExpanded(!dmListExpanded)}
              >
                <div className="flex items-center">
                  {dmListExpanded ? (
                    <ChevronDown className="h-3 w-3 mr-1" />
                  ) : (
                    <ChevronRight className="h-3 w-3 mr-1" />
                  )}
                  Direct Messages
                </div>
              </h2>
              <button
                onClick={toggleUserSearch}
                className={`text-xs rounded-full w-5 h-5 flex items-center justify-center transition-colors ${
                  darkMode
                    ? "bg-slate-700 hover:bg-slate-600 text-slate-300"
                    : "bg-slate-200 hover:bg-slate-300 text-slate-600"
                }`}
                title="New message"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
            </div>

            {showUserSearch && (
              <div
                className={`mb-2 transition-all duration-300 fade-in ${darkMode ? "bg-slate-700" : "bg-slate-100"} rounded-md overflow-hidden`}
              >
                <input
                  type="text"
                  value={userSearchQuery}
                  onChange={(e) => setUserSearchQuery(e.target.value)}
                  placeholder="Search for users..."
                  className={`w-full p-2 text-sm outline-none ${darkMode ? "bg-slate-700 text-slate-100" : "bg-slate-100 text-slate-800"}`}
                />
                <div
                  className={`max-h-40 overflow-y-auto ${userSearchQuery ? "border-t" : ""} ${darkMode ? "border-slate-600" : "border-slate-200"}`}
                >
                  {userSearchQuery &&
                    getFilteredUsers().map((user) => (
                      <div
                        key={user.id}
                        className={`p-2 flex items-center space-x-2 cursor-pointer transition-colors ${darkMode ? "hover:bg-slate-600" : "hover:bg-slate-200"}`}
                        onClick={() => startNewDM(user.id)}
                      >
                        <div className="relative">
                          <div className="h-6 w-6 rounded-full overflow-hidden">
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          {user.isOnline && (
                            <div className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 ring-1 ring-white"></div>
                          )}
                        </div>
                        <span className="font-medium text-sm truncate">
                          {user.name}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {dmListExpanded && (
              <div className="space-y-1">
                {getUsersWithDMs().map((item, index) => (
                  <div
                    key={item.user.id}
                    onClick={() => handleDMUserChange(item.user.id)}
                    className={`p-2 rounded flex items-center justify-between cursor-pointer transition-all hover-scale
                  ${
                    activeDMUser === item.user.id && activeView === "dm"
                      ? darkMode
                        ? "bg-slate-700"
                        : "bg-slate-100"
                      : darkMode
                        ? "hover:bg-slate-700"
                        : "hover:bg-slate-100"
                  }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <div className="relative">
                        <div className="h-6 w-6 rounded-full overflow-hidden">
                          <img
                            src={item.user.avatar}
                            alt={item.user.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        {item.user.isOnline && (
                          <div className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 ring-1 ring-white pulse"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">
                          {item.user.name}
                        </div>
                        {item.lastMessage && (
                          <div className="text-xs text-slate-400 truncate">
                            {item.lastMessage.sender.id === currentUser.id
                              ? "You: "
                              : ""}
                            {item.lastMessage.content}
                          </div>
                        )}
                      </div>
                    </div>
                    {item.unread > 0 && (
                      <div className="bg-indigo-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center pop-in ml-1">
                        {item.unread}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-4 pt-2">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Channels
            </h2>
            <div className="space-y-1">
              {channels.map((channel, index) => (
                <div
                  key={channel.id}
                  onClick={() => handleChannelChange(channel.id)}
                  className={`p-2 rounded flex items-center justify-between cursor-pointer transition-all hover-scale
                ${
                  activeChannel === channel.id && activeView === "channel"
                    ? darkMode
                      ? "bg-slate-700"
                      : "bg-slate-100"
                    : darkMode
                      ? "hover:bg-slate-700"
                      : "hover:bg-slate-100"
                }`}
                  style={{ animationDelay: `${(index + 5) * 50}ms` }}
                >
                  <div className="flex items-center space-x-3">
                    <Hash className="h-4 w-4 text-slate-400" />
                    <span className="font-medium">{channel.name}</span>
                  </div>
                  {channel.unread > 0 && (
                    <div
                      className={`text-xs rounded-full h-5 w-5 flex items-center justify-center ${
                        darkMode
                          ? "bg-slate-600 text-slate-300"
                          : "bg-slate-300 text-slate-600"
                      }`}
                    >
                      {channel.unread}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </nav>

        <main className="flex-1 flex flex-col overflow-hidden">
          <div
            className={`py-3 px-4 border-b flex items-center justify-between transition-colors duration-300 ${darkMode ? "border-slate-700" : "border-slate-200"}`}
          >
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={`p-1 rounded mr-1 md:hidden transition-transform hover-scale ${darkMode ? "hover:bg-slate-700" : "hover:bg-slate-200"}`}
              >
                <Menu className="h-5 w-5" />
              </button>

              {activeView === "channel" ? (
                <>
                  <Hash className="h-5 w-5 text-slate-400" />
                  <h2 className="font-semibold">{activeChannel}</h2>
                </>
              ) : activeDMUser ? (
                <>
                  <div className="relative">
                    <div className="h-6 w-6 rounded-full overflow-hidden">
                      {getActiveDMUserDetails() && (
                        <img
                          src={getActiveDMUserDetails()!.avatar}
                          alt={getActiveDMUserDetails()!.name}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    {getActiveDMUserDetails()?.isOnline && (
                      <div className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 ring-1 ring-white pulse"></div>
                    )}
                  </div>
                  <h2 className="font-semibold">
                    {getActiveDMUserDetails()?.name}
                  </h2>
                  <span className="text-xs text-slate-400">
                    {getActiveDMUserDetails()?.isOnline
                      ? "online"
                      : getActiveDMUserDetails()?.lastActive}
                  </span>
                </>
              ) : null}
            </div>

            {activeView === "dm" && activeDMUser && (
              <div className="flex items-center space-x-2">
                <button
                  className={`p-1 rounded transition-colors ${darkMode ? "hover:bg-slate-700 text-slate-400" : "hover:bg-slate-200 text-slate-500"}`}
                  title="More options"
                >
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>

          <div
            className="flex-1 overflow-y-auto p-2 md:p-4 space-y-4"
            ref={setMessagesRef}
          >
            {getCurrentMessages().map((message) => (
              <div
                key={message.id}
                className={`${message.parentId ? "ml-6 md:ml-10 border-l-2 pl-2 md:pl-4 " + (darkMode ? "border-slate-700" : "border-slate-200") : ""}
${message.isNew ? "slide-in" : "opacity-100"} transition-opacity`}
              >
                <div className="flex items-start space-x-2 md:space-x-3">
                  <div className="h-8 w-8 rounded-full overflow-hidden bg-slate-300 flex-shrink-0 relative transition-transform hover-scale">
                    <img
                      src={message.sender.avatar}
                      alt={message.sender.name}
                      className="h-full w-full object-cover"
                    />
                    {message.sender.isOnline && (
                      <div className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 ring-1 ring-white pulse"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col xs:flex-row xs:items-baseline xs:space-x-2">
                      <span className="font-semibold">
                        {message.sender.name}
                      </span>
                      <span className="text-xs text-slate-400">
                        {message.timestamp}
                      </span>
                    </div>

                    {message.isCode ? (
                      <div
                        className={`mt-1 rounded-md p-2 md:p-3 font-mono text-xs md:text-sm whitespace-pre overflow-x-auto transition-colors duration-300 ${darkMode ? "bg-slate-700" : "bg-slate-100"}`}
                      >
                        {message.content}
                      </div>
                    ) : (
                      <div className="mt-1 text-sm md:text-base">
                        {message.content}
                      </div>
                    )}

                    {message.media && (
                      <div className="mt-2 max-w-lg pop-in">
                        <div
                          className={`rounded-lg overflow-hidden border ${darkMode ? "border-slate-600" : "border-slate-300"}`}
                        >
                          <img
                            src={message.media.url}
                            alt={message.media.alt || "Shared media"}
                            className="w-full h-auto object-cover transition-transform hover:scale-[1.02]"
                          />
                        </div>
                        <p className="text-xs text-slate-400 mt-1">
                          {message.media.type === "gif" ? "GIF" : "Image"}
                        </p>
                      </div>
                    )}
                    {message.reactions && (
                      <div className="flex flex-wrap mt-2 gap-2">
                        {message.reactions.map((reaction, index) => (
                          <div
                            key={index}
                            onClick={() =>
                              handleReactionClick(message.id, reaction.emoji)
                            }
                            className={`text-xs rounded-full px-2 py-1 flex items-center space-x-1 cursor-pointer transition-all reaction-button
                          ${
                            reaction.reacted
                              ? darkMode
                                ? "bg-indigo-700 hover:bg-indigo-600"
                                : "bg-indigo-100 hover:bg-indigo-200"
                              : darkMode
                                ? "bg-slate-700 hover:bg-slate-600"
                                : "bg-slate-100 hover:bg-slate-200"
                          } hover-scale`}
                            title={reaction.users.map((u) => u.name).join(", ")}
                          >
                            <span>{reaction.emoji}</span>
                            <span
                              className={`${reaction.reacted ? (darkMode ? "text-indigo-200" : "text-indigo-600") : "text-slate-400"}`}
                            >
                              {reaction.count}
                            </span>
                          </div>
                        ))}
                        <div
                          className={`text-xs rounded-full px-2 py-1 flex items-center space-x-1 cursor-pointer transition-all hover-scale reaction-button
                        ${darkMode ? "bg-slate-700 hover:bg-slate-600 text-slate-400" : "bg-slate-100 hover:bg-slate-200 text-slate-500"}`}
                          onClick={() => toggleEmojiPicker(message.id)}
                        >
                          <span>+</span>
                        </div>
                      </div>
                    )}

                    {(!message.reactions || message.reactions.length === 0) && (
                      <div
                        className={`inline-block mt-2 text-xs rounded-full px-2 py-1 cursor-pointer transition-all hover-scale reaction-button
                      ${darkMode ? "bg-slate-700 hover:bg-slate-600 text-slate-400" : "bg-slate-100 hover:bg-slate-200 text-slate-500"}`}
                        onClick={() => toggleEmojiPicker(message.id)}
                      >
                        Add reaction
                      </div>
                    )}

                    {activeEmojiPicker === message.id && (
                      <div
                        className={`mt-2 p-2 rounded-lg shadow-lg z-10 fade-in emoji-picker
                        ${darkMode ? "bg-slate-800 border border-slate-700" : "bg-white border border-slate-200"}`}
                      >
                        <div className="flex flex-wrap gap-2 max-w-xs">
                          {commonEmojis.map((emoji) => (
                            <button
                              key={emoji}
                              onClick={() => addReaction(message.id, emoji)}
                              className={`text-lg p-1 rounded hover:bg-opacity-50 transition-all
                              ${darkMode ? "hover:bg-slate-700" : "hover:bg-slate-200"}`}
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            className={`p-2 md:p-3 border-t transition-colors duration-300 ${darkMode ? "border-slate-700" : "border-slate-200"}`}
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileSelect}
              accept="image/png, image/jpeg, image/gif"
            />

            {isUploading && (
              <div
                className={`mb-2 text-xs px-3 py-1 rounded-full inline-block ${darkMode ? "bg-slate-700 text-slate-300" : "bg-slate-200 text-slate-700"}`}
              >
                <div className="flex items-center">
                  <div className="w-3 h-3 mr-2 rounded-full bg-indigo-500 pulse"></div>
                  Uploading {selectedFile?.name}...
                </div>
              </div>
            )}

            {selectedFile && filePreview && !isUploading && (
              <div
                className={`mb-2 p-2 rounded ${darkMode ? "bg-slate-800 border border-slate-700" : "bg-white border border-slate-200"}`}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-2 max-w-[100px] max-h-[100px] overflow-hidden rounded">
                    <img
                      src={filePreview}
                      alt="Preview"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`font-medium truncate ${darkMode ? "text-slate-200" : "text-slate-700"}`}
                    >
                      {selectedFile.name}
                    </p>
                    <p className="text-xs text-slate-400">
                      {(selectedFile.size / 1024).toFixed(1)} KB
                      {selectedFile.type.includes("gif")
                        ? " • GIF"
                        : " • Image"}
                    </p>
                    <button
                      className={`mt-1 text-xs px-2 py-1 rounded ${darkMode ? "bg-slate-700 hover:bg-slate-600 text-slate-300" : "bg-slate-200 hover:bg-slate-300 text-slate-700"} transition-colors`}
                      onClick={clearSelectedFile}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div
              className={`flex items-center rounded-lg overflow-hidden transition-colors duration-300 ${darkMode ? "bg-slate-700" : "bg-slate-100"}`}
            >
              <button
                onClick={openFileSelector}
                className={`p-2 transition-transform hover-scale ${darkMode ? "text-slate-400 hover:text-slate-200" : "text-slate-500 hover:text-slate-700"}`}
                title="Upload image or GIF"
              >
                <Paperclip className="h-5 w-5" />
              </button>
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={
                  activeView === "channel"
                    ? `Message #${activeChannel}`
                    : `Message ${getActiveDMUserDetails()?.name}`
                }
                className={`flex-1 p-2 min-h-10 resize-none outline-none transition-colors duration-300 ${darkMode ? "bg-slate-700 text-slate-100" : "bg-slate-100 text-slate-800"}`}
                style={{
                  fontFamily:
                    "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                }}
              />
              <button
                onClick={handleSendMessage}
                className={`p-2 transition-transform ${newMessage.trim() || selectedFile ? "hover-scale text-indigo-500 hover:text-indigo-400" : darkMode ? "text-slate-500" : "text-slate-400"}`}
                disabled={!newMessage.trim() && !selectedFile}
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
            <div className="text-xs text-slate-400 mt-1 px-2 hidden sm:flex flex-wrap items-center gap-2">
              <span>
                Press{" "}
                <kbd
                  className={`px-1.5 py-0.5 rounded transition-colors duration-300 ${darkMode ? "bg-slate-700" : "bg-slate-200"}`}
                >
                  Enter
                </kbd>{" "}
                to send
              </span>
              <span>
                <kbd
                  className={`px-1.5 py-0.5 rounded transition-colors duration-300 ${darkMode ? "bg-slate-700" : "bg-slate-200"}`}
                >
                  Shift
                </kbd>{" "}
                +{" "}
                <kbd
                  className={`px-1.5 py-0.5 rounded ml-1 transition-colors duration-300 ${darkMode ? "bg-slate-700" : "bg-slate-200"}`}
                >
                  Enter
                </kbd>{" "}
                for new line
              </span>
              <span>
                Click <Paperclip className="h-3 w-3 inline-block mx-1" /> to
                upload images/GIFs
              </span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
