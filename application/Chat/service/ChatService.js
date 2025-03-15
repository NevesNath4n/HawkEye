import ChatRepository from "../../../infrastructure/repositories/ChatRepository.js";

export default class ChatService {
  constructor() {
    this.chatRepository = new ChatRepository();
  }

  async deleteThread(threadId) {
    try {
      const data = await this.chatRepository.deleteThread(threadId);
      return data;
    } catch (error) {
      console.error("Error deleting thread:", error);
      throw error;
    }
  }

  async createThread(chat) {
    try {
      const data = await this.chatRepository.createThread(chat);
      return data;
    } catch (error) {
      console.error("Error creating thread:", error);
      throw error;
    }
  }

  async getChatHistory(repositoryId, userId) {
    try {
      const data = await this.chatRepository.getChatHistory(repositoryId, userId);
      return data;
    } catch (error) {
      console.error("Error getting chat history:", error);
      throw error;
    }
  }

  async getThread(threadId) {
    try {
      const data = await this.chatRepository.getThread(threadId);
      return data;
    } catch (error) {
      console.error("Error getting thread:", error);
      throw error;
    }
  }

  async createThreadMessage(message, threadId) {
    try {
      const data = await this.chatRepository.createThreadMessage(message, threadId);
      return data;
    } catch (error) {
      console.error("Error creating thread message:", error);
      throw error;
    }
  }
}