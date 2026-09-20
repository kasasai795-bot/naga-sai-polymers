const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Get all notifications
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await prisma.notification.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(notifications);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to fetch notifications",
    });
  }
};

// Create notification
exports.createNotification = async (
  title,
  message,
  type,
  priority = "Normal",
  actionUrl = null
) => {
  return prisma.notification.create({
    data: {
      title,
      message,
      type,
      priority,
      actionUrl,
    },
  });
};

// Mark as Read
exports.markAsRead = async (req, res) => {
  try {
    const notification = await prisma.notification.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        isRead: true,
      },
    });

    res.json(notification);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to update notification",
    });
  }
};

// Delete notification
exports.deleteNotification = async (req, res) => {
  try {
    await prisma.notification.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.json({
      message: "Notification deleted",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to delete notification",
    });
  }
};