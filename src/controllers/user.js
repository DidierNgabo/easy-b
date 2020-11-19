import fs from 'fs';
/* eslint-disable object-curly-newline */
import User from '../models/user';

export default class UserCtrl {
  static async createUser(req, res) {
    const { name, username, email, age } = req.body;
    try {
      const user = new User({
        name,
        username,
        email,
        age,
        imageUrl: `/images/${req.file.filename}`,
      });
      const newUser = await user.save();
      if (newUser) {
        res.status(201).json(newUser);
      } else {
        res.status(400).json({
          message: 'error saving user',
        });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  static async getAllUsers(req, res) {
    try {
      const users = await User.find();
      if (users) {
        res.status(200).json({
          users,
        });
      } else {
        res.status(400).json({
          message: 'error retrieving user',
        });
      }
    } catch (error) {
      res.status(500).json({
        error,
      });
      console.log(error);
    }
  }

  static async getUserById(req, res) {
    try {
      const user = await User.findById({ _id: req.params.id });
      if (user) {
        res.status(200).json({
          user,
        });
      } else {
        res.status(500).json({
          message: 'user not found!',
        });
      }
    } catch (error) {
      res.status(400).json({ error });
    }
  }

  static async updateUser(req, res) {
    try {
      let user = new User({ _id: req.params.id });
      if (req.file) {
        const { name, username, email, age } = req.body;
        user = new User({
          _id: req.params.id,
          name,
          username,
          email,
          age,
          imageUrl: `/images/${req.file.filename}`,
        });
      } else {
        const { name, username, email, age, imageUrl } = req.body;
        user = new User({
          _id: req.params.id,
          name,
          username,
          email,
          age,
          imageUrl,
        });
      }
      const updatedUser = await User.updateOne({ _id: req.params.id }, user);
      if (updatedUser) {
        res.status(201).json({
          message: 'user updated sucessfully',
        });
      } else {
        res.status(400).json({
          message: 'failed to update user',
        });
      }
    } catch (error) {
      res.status(500).json({
        error,
      });
      console.log(error);
    }
  }

  static async deleteUser(req, res) {
    try {
      const userToDelete = await User.findOne({ _id: req.params.id });
      if (userToDelete) {
        const filename = userToDelete.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, async () => {
          const deleted = await User.deleteOne({ _id: req.params.id });
          if (deleted) {
            res.status(200).json({
              message: 'user deleted',
            });
            console.log('user successfully deleted');
          } else {
            res.status(400).json({
              message: 'User can not be deleted',
            });
          }
        });
      }
    } catch (error) {
      res.status(500).json({
        error,
      });
    }
  }
}
