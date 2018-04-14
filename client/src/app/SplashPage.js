/*
 * Copyright (c) 2017 Bonnie Schulkin. All Rights Reserved.
 *
 * This file is part of BoxCharter.
 *
 * BoxCharter is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option)
 * any later version.
 *
 * BoxCharter is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License
 * for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with BoxCharter. If not, see <http://www.gnu.org/licenses/>.
 *
 */

/**
 * Splash Page component for BoxCharter
 * @module
 * SplashPage
 */

import React from 'react';

const SplashPage = () => (
  <div className="splash-page">
    <div className="splash-blurb">
      <h1>
        <img className="boxcharter-splash" alt="boxcharter-logo" src="/public/images/logos/boxcharter-75.png" />
          BoxCharter
      </h1>
      <h4>Create box charts. Download PDFs. Make music with friends.</h4>
    </div>
  </div>
);

export default SplashPage;
