const express = require('express');
const User = require('../models/User');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res) => {
    try {
        const pageSize = 10;
        const page = Number(req.query.pageNumber) || 1;

        const count = await User.countDocuments({});
        const users = await User.find({})
            .select('-password')
            .limit(pageSize)
            .skip(pageSize * (page - 1))
            .sort({ createdAt: -1 });

        res.json({
            users,
            page,
            pages: Math.ceil(count / pageSize),
            total: count,
        });
    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');

        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.role = req.body.role || user.role;
            user.isActive = req.body.isActive !== undefined ? req.body.isActive : user.isActive;

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                isActive: updatedUser.isActive,
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Update user error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            await user.remove();
            res.json({ message: 'User removed' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Add user address
// @route   POST /api/users/addresses
// @access  Private
const addAddress = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            const newAddress = {
                type: req.body.type || 'home',
                street: req.body.street,
                city: req.body.city,
                state: req.body.state,
                zipCode: req.body.zipCode,
                country: req.body.country || 'United States',
                isDefault: req.body.isDefault || false,
            };

            // If this is the first address or marked as default, make it default
            if (user.addresses.length === 0 || newAddress.isDefault) {
                user.addresses.forEach(addr => addr.isDefault = false);
                newAddress.isDefault = true;
            }

            user.addresses.push(newAddress);
            await user.save();

            res.status(201).json(user.addresses[user.addresses.length - 1]);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Add address error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Update user address
// @route   PUT /api/users/addresses/:id
// @access  Private
const updateAddress = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            const addressIndex = user.addresses.findIndex(
                addr => addr._id.toString() === req.params.id
            );

            if (addressIndex > -1) {
                const updatedAddress = {
                    type: req.body.type || user.addresses[addressIndex].type,
                    street: req.body.street || user.addresses[addressIndex].street,
                    city: req.body.city || user.addresses[addressIndex].city,
                    state: req.body.state || user.addresses[addressIndex].state,
                    zipCode: req.body.zipCode || user.addresses[addressIndex].zipCode,
                    country: req.body.country || user.addresses[addressIndex].country,
                    isDefault: req.body.isDefault !== undefined ? req.body.isDefault : user.addresses[addressIndex].isDefault,
                };

                // If making this address default, unset others
                if (updatedAddress.isDefault) {
                    user.addresses.forEach(addr => addr.isDefault = false);
                }

                user.addresses[addressIndex] = updatedAddress;
                await user.save();

                res.json(user.addresses[addressIndex]);
            } else {
                res.status(404).json({ message: 'Address not found' });
            }
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Update address error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Delete user address
// @route   DELETE /api/users/addresses/:id
// @access  Private
const deleteAddress = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            const addressIndex = user.addresses.findIndex(
                addr => addr._id.toString() === req.params.id
            );

            if (addressIndex > -1) {
                const deletedAddress = user.addresses[addressIndex];
                user.addresses.splice(addressIndex, 1);

                // If deleted address was default and there are other addresses, make first one default
                if (deletedAddress.isDefault && user.addresses.length > 0) {
                    user.addresses[0].isDefault = true;
                }

                await user.save();
                res.json({ message: 'Address removed' });
            } else {
                res.status(404).json({ message: 'Address not found' });
            }
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Delete address error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get user addresses
// @route   GET /api/users/addresses
// @access  Private
const getAddresses = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            res.json(user.addresses);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Get addresses error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

router.route('/')
    .get(protect, admin, getUsers);

router.route('/:id')
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser)
    .delete(protect, admin, deleteUser);

router.route('/addresses')
    .get(protect, getAddresses)
    .post(protect, addAddress);

router.route('/addresses/:id')
    .put(protect, updateAddress)
    .delete(protect, deleteAddress);

module.exports = router;
