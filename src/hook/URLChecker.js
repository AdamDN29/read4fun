import React from 'react'
import { useState, useEffect } from "react";
import validator from 'validator'

export default function URLChecker (value) {
    if (validator.isURL(value)) {
        return value;
    } else {
        return null;
    }
}
