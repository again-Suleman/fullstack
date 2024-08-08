const express = require("express");
const cors = require("cors")
const path = require('path');
const fs = require('fs');

// Making the directory if not exist
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Routes
const supplierRoutes = require("../routes/supplierRoutes")
const storeRoutes = require("../routes/storeRoutes")

module.exports = function (app) {
  //---------------------------------
  app.use(express.json());
  app.use(cors())
  app.use('/uploads', express.static(uploadsDir));

  app.use('/api/supplier', supplierRoutes);
  app.use('/api/store', storeRoutes);


  //----------------------------------
};
