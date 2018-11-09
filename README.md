# Trigger latency of Firebase Cloud Functions

This repository is an appendix for the Medium Story https://medium.com/p/52a3cc59c16

## Structure

### createPost

A https trigger function to be called from cron. This function creates either a Firestore document or a data three in the Realtime Database. This is the basis for the test of the onCreate triggers.

### onCreatePost

A firestore.onCreate trigger that updates several timestamps back to the document.

### onCreatePostRTD

A database.onCreate trigger that updates several timestamps back to the document.