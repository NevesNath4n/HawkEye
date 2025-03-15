import ChatService from "../service/ChatService.js";
import Marcia from "../../Agent/Engine/Marcia.js";
export default class ChatController {
  constructor() {
    this.chatService = new ChatService();
    this.marcia = new Marcia();
}

  async deleteThread(req, res) {
    const { id } = req.params;
    try {
      const data = await this.chatService.deleteThread(id);
      res.status(200).json(data);
    } catch (error) {
      console.error("Error deleting thread:", error);
      res.status(500).json({ error: error.message });
    }
  }

  async createThread(req, res) {
    let chat = req.body;
    chat.created_by = req.user.sub;
    try {
      const data = await this.chatService.createThread(chat);
      res.status(201).json(data);
    } catch (error) {
      console.error("Error creating thread:", error);
      res.status(500).json({ error: error.message });
    }
  }

  async getChatHistory(req, res) {
    const { repositoryId } = req.query;
    
    try {
      const data = await this.chatService.getChatHistory(repositoryId,req.user.sub);
      res.status(200).json(data);
    } catch (error) {
      console.error("Error getting chat history:", error);
      res.status(500).json({ error: error.message });
    }
  }

  async getThread(req, res) {
    const { id } = req.params;
    try {
      const data = await this.chatService.getThread(id);
      res.status(200).json(data);
    } catch (error) {
      console.error("Error getting thread:", error);
      res.status(500).json({ error: error.message });
    }
  }

  async createThreadMessage(req, res) {
    const { id } = req.params;
    let message = req.body;
    message.role = "user";
    let repository_id = message.repository_id;
    delete message.repository_id;
    try {          
        await this.chatService.createThreadMessage(message, id);
        let threadMessage = await this.chatService.getThread(id);
        console.log(repository_id);
        let response = await this.marcia.getResponse(threadMessage,repository_id);
        let botResponse = await this.chatService.createThreadMessage({content:response,role:"assistant"}, id);
        res.status(201).json(botResponse);
    } catch (error) {
      console.error("Error creating thread message:", error);
      res.status(500).json({ error: error.message });
    }
  }
}