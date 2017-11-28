"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../constants");
var admin = require("firebase-admin");
var index_1 = require("../index");
var fieldValue = admin.firestore.FieldValue;
var messagingAdmin = admin.messaging();
function sendNewFollowerNotification(event) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, authorId, authorUsername, authorPhotoUrl, eventAlreadyExist, userData, tokens_1, payload, data, response, privateUserDataDoc, newEventPromise, updateTokensPromise, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = event.params.followedId;
                    authorId = event.params.followerId;
                    authorUsername = event.data.data().username;
                    authorPhotoUrl = event.data.data().photoUrl;
                    //An user can't send notifications to himself
                    if (userId === authorId) {
                        return [2 /*return*/, console.log('User doesnt recieve their own notifications')];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, userEventExist(userId, constants_1.FOLLOW_EVENT)];
                case 2:
                    eventAlreadyExist = _a.sent();
                    //If the event exist, means that a notification was already sent for such event and user
                    if (eventAlreadyExist)
                        return [2 /*return*/, console.log('An event for this action have been sent already')];
                    return [4 /*yield*/, getUserPrivateData(userId)];
                case 3:
                    userData = _a.sent();
                    if (!userData.exists)
                        return [2 /*return*/, console.log('User doc doesnt exists')];
                    tokens_1 = userData.data().messagingTokens;
                    payload = {
                        notification: {},
                        data: {
                            "kind": constants_1.FOLLOW_EVENT,
                            "authorId": "" + authorId,
                            "authorUsername": "" + authorUsername,
                            "authorPhotoUrl": "" + authorPhotoUrl,
                            "referenceId": "" + authorId,
                        }
                    };
                    data = {
                        kind: constants_1.FOLLOW_EVENT,
                        interactionUserUsername: authorUsername,
                        interactionUserProfilePicture: authorPhotoUrl,
                        interactionUser: authorId,
                        interactionRef: authorId,
                        timestamp: fieldValue.serverTimestamp()
                    };
                    return [4 /*yield*/, messagingAdmin.sendToDevice(tokens_1, payload)];
                case 4:
                    response = _a.sent();
                    //Check the response to see if any notification failed and delete deprecated tokens if necessary
                    response.results.forEach(function (result, index) {
                        var error = result.error;
                        if (error) {
                            console.error('Failure sending notification to', tokens_1[index], error);
                            // Cleanup the tokens who are not registered anymore.
                            if (error.code === 'messaging/invalid-registration-token' ||
                                error.code === 'messaging/registration-token-not-registered') {
                                tokens_1.remove(index);
                            }
                        }
                    });
                    privateUserDataDoc = index_1.firestoreInstance.collection('PrivateUserData').doc(userId);
                    newEventPromise = privateUserDataDoc.collection(constants_1.EVENTS).doc().set(data);
                    updateTokensPromise = privateUserDataDoc.update('messagingTokens', tokens_1);
                    //Execute them
                    return [4 /*yield*/, Promise.all([newEventPromise, updateTokensPromise])];
                case 5:
                    //Execute them
                    _a.sent();
                    console.log('The process of send a new follow notification for the user ', userId, ' has finished successfully');
                    return [3 /*break*/, 7];
                case 6:
                    err_1 = _a.sent();
                    console.error('Failed sending a follow notification to user', userId, 'with error', err_1);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.sendNewFollowerNotification = sendNewFollowerNotification;
function sendPostNotication(event, kind) {
    return __awaiter(this, void 0, void 0, function () {
        var commentAuthorId, postId, postAuthorId, authorUsername, authorPhotoUrl, eventAlreadyExist, userData, tokens_2, payload, data, response, privateUserDataDoc, newEventPromise, updateTokensPromise, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    commentAuthorId = event.data.data().author.uid;
                    postId = event.params.postId;
                    postAuthorId = event.data.data().postAuthorId;
                    authorUsername = event.data.data().author.fullName;
                    authorPhotoUrl = event.data.data().author.profilePicture;
                    //An user can't send notifications to himself
                    if (commentAuthorId === postAuthorId) {
                        return [2 /*return*/, console.log('User doesnt recieve their own notifications')];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, userEventExist(commentAuthorId, kind, postId)];
                case 2:
                    eventAlreadyExist = _a.sent();
                    //If the event exist, means that a notification was already sent for such event and user
                    if (eventAlreadyExist)
                        return [2 /*return*/, console.log('An event for this action have been sent already')];
                    return [4 /*yield*/, getUserPrivateData(postAuthorId)];
                case 3:
                    userData = _a.sent();
                    if (!userData.exists)
                        return [2 /*return*/, console.log('User doc doesnt exists')];
                    tokens_2 = userData.data().messagingTokens;
                    payload = {
                        notification: {},
                        data: {
                            "kind": kind,
                            "authorId": "" + commentAuthorId,
                            "authorUsername": "" + authorUsername,
                            "authorPhotoUrl": "" + authorPhotoUrl,
                            "referenceId": "" + postId,
                        }
                    };
                    data = {
                        kind: kind,
                        interactionUserUsername: authorUsername,
                        interactionUserProfilePicture: authorPhotoUrl,
                        interactionUser: commentAuthorId,
                        interactionRef: postId,
                        timestamp: fieldValue.serverTimestamp()
                    };
                    return [4 /*yield*/, messagingAdmin.sendToDevice(tokens_2, payload)];
                case 4:
                    response = _a.sent();
                    //Check the response to see if any notification failed and delete deprecated tokens if necessary
                    response.results.forEach(function (result, index) {
                        var error = result.error;
                        if (error) {
                            console.error('Failure sending notification to', tokens_2[index], error);
                            // Cleanup the tokens who are not registered anymore.
                            if (error.code === 'messaging/invalid-registration-token' ||
                                error.code === 'messaging/registration-token-not-registered') {
                                tokens_2.remove(index);
                            }
                        }
                    });
                    privateUserDataDoc = index_1.firestoreInstance.collection('PrivateUserData').doc(postAuthorId);
                    newEventPromise = privateUserDataDoc.collection(constants_1.EVENTS).doc().set(data);
                    updateTokensPromise = privateUserDataDoc.update('messagingTokens', tokens_2);
                    //Execute them
                    return [4 /*yield*/, Promise.all([newEventPromise, updateTokensPromise])];
                case 5:
                    //Execute them
                    _a.sent();
                    console.log('The process of send a new follow notification for the user ', postAuthorId, ' has finished successfully');
                    return [3 /*break*/, 7];
                case 6:
                    err_2 = _a.sent();
                    console.error('Failed sending a follow notification to user', postAuthorId, 'with error', err_2);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.sendPostNotication = sendPostNotication;
function getUserPrivateData(userId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, index_1.firestoreInstance.collection(constants_1.PRIV_USER_DATA).doc(userId).get()];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function userEventExist(userId, kind, interactionRef) {
    if (interactionRef === void 0) { interactionRef = null; }
    return __awaiter(this, void 0, void 0, function () {
        var ref, userEvent;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (interactionRef == null) {
                        ref = index_1.firestoreInstance.collection('PrivateUserData')
                            .doc(userId).collection(constants_1.EVENTS)
                            .where('interactionUser', '==', userId)
                            .where('kind', '==', kind);
                    }
                    else {
                        ref = index_1.firestoreInstance.collection('PrivateUserData')
                            .doc(userId).collection(constants_1.EVENTS)
                            .where('interactionUser', '==', userId)
                            .where('interactionRef', '==', interactionRef)
                            .where('kind', '==', kind);
                    }
                    return [4 /*yield*/, ref.get()];
                case 1:
                    userEvent = _a.sent();
                    return [2 /*return*/, !userEvent.empty];
            }
        });
    });
}
