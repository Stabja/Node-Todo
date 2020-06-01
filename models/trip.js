'use strict';

export default (sequelize, DataTypes) => {
  const Trip = sequelize.define('Trip', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tripDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    rider: {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Rider name is required.' }
        }
      },
      phoneNo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        notNull: { msg: 'Email is required.' }
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    },
    driver: {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Driver name is required.' }
        }
      },
      phoneNo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        notNull: { msg: 'Email is required.' }
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    },
    tripStatus: {
      type: DataTypes.ENUM('Customer Requested', 'Driver Rejected', 'Driver Accepted', 'Trip Started', 'Trip Completed'),
      defaultValue: 'Customer Requested'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    pickupDistance: {
      type: DataTypes.DECIMAL(10,8),
      allowNull: function () { return this.isAvailable === true }
    },
    estimatedPickupTime: {
      type: DataTypes.DECIMAL(10,8),
      allowNull: function () { return this.isAvailable === true }
    },
    pickupLocation: {
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lat: {
        type: DataTypes.DECIMAL(10,8),
        allowNull: function () { return this.isAvailable === true }
      },
      lng: {
        type: DataTypes.DECIMAL(10,8),
        allowNull: function () { return this.isAvailable === true }
      },
    },
    dropDistance: {
      type: DataTypes.DECIMAL(10,8),
      allowNull: function () { return this.isAvailable === true }
    },
    estimatedDropTime: {
      type: DataTypes.DECIMAL(10,8),
      allowNull: function () { return this.isAvailable === true }
    },
    dropLocation: {
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lat: {
        type: DataTypes.DECIMAL(10,8),
        allowNull: function () { return this.isAvailable === true }
      },
      lng: {
        type: DataTypes.DECIMAL(10,8),
        allowNull: function () { return this.isAvailable === true }
      },
    },
    tripFare: {
      type: DataTypes.DECIMAL(10,8),
      allowNull: function () { return this.isAvailable === true }
    },
    fareCollected: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {});
  Trip.associate = function(models) {
  };
  return Trip;
};