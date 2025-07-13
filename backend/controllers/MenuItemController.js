import MenuItem from '../models/MenuItemModel.js';
import fs from 'fs';
import path from 'path';

// Get all menu items
export const getMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.findAll();
    res.json(menuItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single menu item
export const getMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    
    const menuItem = await MenuItem.findByPk(id);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    
    res.json(menuItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new menu item
export const createMenuItem = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }
    
    const image_url = `/uploads/${req.file.filename}`;
    
    const menuItem = await MenuItem.create({
      name,
      description,
      image_url,
      price
    });
    
    res.status(201).json(menuItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a menu item
export const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;
    
    const menuItem = await MenuItem.findByPk(id);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    
    let image_url = menuItem.image_url;
    
    // If new image is uploaded
    if (req.file) {
      // Delete old image if it exists
      if (menuItem.image_url) {
        const oldImagePath = path.join(process.cwd(), 'public', menuItem.image_url);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      
      // Set new image URL
      image_url = `/uploads/${req.file.filename}`;
    }
    
    // Update menu item
    await menuItem.update({
      name: name || menuItem.name,
      description: description !== undefined ? description : menuItem.description,
      image_url,
      price: price || menuItem.price
    });
    
    res.json(menuItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a menu item
export const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    
    const menuItem = await MenuItem.findByPk(id);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    
    // Delete image file if it exists
    if (menuItem.image_url) {
      const imagePath = path.join(process.cwd(), 'public', menuItem.image_url);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    
    // Delete menu item from database
    await menuItem.destroy();
    
    res.json({ message: 'Menu item deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};