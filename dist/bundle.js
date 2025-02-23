/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/app-bar.js":
/*!***********************************!*\
  !*** ./src/components/app-bar.js ***!
  \***********************************/
/***/ (() => {

eval("class AppBar extends HTMLElement {\r\n    connectedCallback() {\r\n        this.innerHTML = `<h1>Aplikasi Catatan</h1>`;\r\n    }\r\n}\r\ncustomElements.define('app-bar', AppBar);\n\n//# sourceURL=webpack://notes-app/./src/components/app-bar.js?");

/***/ }),

/***/ "./src/components/footer-bar.js":
/*!**************************************!*\
  !*** ./src/components/footer-bar.js ***!
  \**************************************/
/***/ (() => {

eval("class FooterBar extends HTMLElement {\r\n    connectedCallback() {\r\n        this.innerHTML = `\r\n            <footer>\r\n                <p>&copy; ${new Date().getFullYear()} Aplikasi Catatan - Dibuat oleh Ahmad Fauzan</p>\r\n            </footer>\r\n        `;\r\n    }\r\n}\r\ncustomElements.define('footer-bar', FooterBar);\n\n//# sourceURL=webpack://notes-app/./src/components/footer-bar.js?");

/***/ }),

/***/ "./src/components/note-form.js":
/*!*************************************!*\
  !*** ./src/components/note-form.js ***!
  \*************************************/
/***/ (() => {

eval("class NoteForm extends HTMLElement {\r\n    connectedCallback() {\r\n        this.render();\r\n    }\r\n\r\n    render() {\r\n        this.innerHTML = `\r\n            <form id=\"note-form\">\r\n                <input type=\"text\" id=\"title\" placeholder=\"Judul Catatan\" required>\r\n                <textarea id=\"body\" placeholder=\"Isi Catatan\" required></textarea>\r\n                <button type=\"submit\" class=\"add-btn\">Tambah Catatan <i class=\"ri-save-2-line\"></i></button>\r\n            </form>\r\n        `;\r\n\r\n        this.querySelector('form').addEventListener('submit', this.addNote.bind(this));\r\n    }\r\n\r\n    addNote(event) {\r\n        event.preventDefault();\r\n        const title = this.querySelector('#title').value;\r\n        const body = this.querySelector('#body').value;\r\n\r\n        if (!title || !body) {\r\n            alert(\"Judul dan isi catatan tidak boleh kosong!\");\r\n            return;\r\n        }\r\n\r\n        const newNote = {\r\n            id: `notes-${Date.now()}`,\r\n            title,\r\n            body,\r\n            createdAt: new Date().toISOString(),\r\n            archived: false\r\n        };\r\n\r\n        document.dispatchEvent(new CustomEvent('note-added', { detail: newNote }));\r\n        this.querySelector('form').reset();\r\n    }\r\n}\r\n\r\ncustomElements.define('note-form', NoteForm);\r\n\n\n//# sourceURL=webpack://notes-app/./src/components/note-form.js?");

/***/ }),

/***/ "./src/components/note-item.js":
/*!*************************************!*\
  !*** ./src/components/note-item.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _data_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data/api.js */ \"./src/data/api.js\");\n  // Import deleteNote function\r\n\r\nclass NoteItem extends HTMLElement {\r\n    set note(note) {\r\n        this._note = note;\r\n        this.render();\r\n    }\r\n\r\n    render() {\r\n        if (!this._note) return;\r\n        this.innerHTML = `\r\n            <h3>${this._note.title}</h3>\r\n            <p>${this._note.body}</p>\r\n            <small>${new Date(this._note.createdAt).toLocaleDateString()}</small>\r\n            <button class=\"edit-btn\"><i class=\"edit ri-pencil-fill\"></i></button>\r\n            <button class=\"delete-btn\"><i class=\"delete ri-delete-bin-fill\"></i></button>\r\n        `;\r\n\r\n        this.querySelector('.delete-btn').addEventListener('click', () => {\r\n            this.removeNote();\r\n        });\r\n\r\n        this.querySelector('.edit-btn').addEventListener('click', () => {\r\n            this.editNote();\r\n        });\r\n    }\r\n\r\n    async removeNote() {\r\n        const isDeleted = await (0,_data_api_js__WEBPACK_IMPORTED_MODULE_0__.deleteNote)(this._note.id); // Call delete API\r\n        if (isDeleted) {\r\n            document.dispatchEvent(new CustomEvent('notes-updated')); // Re-render notes\r\n        }\r\n    }\r\n\r\n    editNote() {\r\n        const newTitle = prompt(\"Edit Judul:\", this._note.title);\r\n        const newBody = prompt(\"Edit Isi Catatan:\", this._note.body);\r\n\r\n        if (newTitle !== null && newBody !== null) {\r\n            this._note.title = newTitle;\r\n            this._note.body = newBody;\r\n            document.dispatchEvent(new CustomEvent('notes-updated'));\r\n        }\r\n    }\r\n}\r\n\r\ncustomElements.define('note-item', NoteItem);\n\n//# sourceURL=webpack://notes-app/./src/components/note-item.js?");

/***/ }),

/***/ "./src/data/api.js":
/*!*************************!*\
  !*** ./src/data/api.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addNote: () => (/* binding */ addNote),\n/* harmony export */   deleteNote: () => (/* binding */ deleteNote),\n/* harmony export */   getNotes: () => (/* binding */ getNotes)\n/* harmony export */ });\nconst API_URL = 'https://notes-api.dicoding.dev/v2';\r\n\r\nasync function getNotes() {\r\n  try {\r\n    const response = await fetch(`${API_URL}/notes`);\r\n    if (!response.ok) {\r\n      throw new Error('Failed to fetch notes');\r\n    }\r\n    return await response.json();\r\n  } catch (error) {\r\n    console.error(error);\r\n  }\r\n}\r\n\r\nasync function addNote(note) {\r\n  try {\r\n    const response = await fetch(`${API_URL}/notes`, {\r\n      method: 'POST',\r\n      headers: {\r\n        'Content-Type': 'application/json',\r\n      },\r\n      body: JSON.stringify(note),\r\n    });\r\n    if (!response.ok) {\r\n      throw new Error('Failed to add note');\r\n    }\r\n    return await response.json();\r\n  } catch (error) {\r\n    console.error(error);\r\n  }\r\n}\r\n\r\nasync function deleteNote(id) {\r\n  try {\r\n    const response = await fetch(`${API_URL}/notes/${id}`, {\r\n      method: 'DELETE',\r\n    });\r\n    if (!response.ok) {\r\n      throw new Error('Failed to delete note');\r\n    }\r\n    return await response.json();\r\n  } catch (error) {\r\n    console.error(error);\r\n  }\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://notes-app/./src/data/api.js?");

/***/ }),

/***/ "./src/script.js":
/*!***********************!*\
  !*** ./src/script.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _data_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data/api.js */ \"./src/data/api.js\");\n/* harmony import */ var _components_app_bar_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/app-bar.js */ \"./src/components/app-bar.js\");\n/* harmony import */ var _components_app_bar_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_components_app_bar_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_note_form_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/note-form.js */ \"./src/components/note-form.js\");\n/* harmony import */ var _components_note_form_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_components_note_form_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _components_note_item_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/note-item.js */ \"./src/components/note-item.js\");\n/* harmony import */ var _components_footer_bar_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/footer-bar.js */ \"./src/components/footer-bar.js\");\n/* harmony import */ var _components_footer_bar_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_components_footer_bar_js__WEBPACK_IMPORTED_MODULE_4__);\n\r\n\r\n\r\n\r\n\r\n\r\nfunction renderNotes() {\r\n    const container = document.getElementById('notes-container');\r\n    container.innerHTML = '';\r\n    notesData.forEach(note => {\r\n        const noteElement = document.createElement('note-item');\r\n        noteElement.note = note;\r\n        container.appendChild(noteElement);\r\n    });\r\n}\r\n\r\nasync function fetchNotes() {\r\n    const notes = await (0,_data_api_js__WEBPACK_IMPORTED_MODULE_0__.getNotes)();\r\n    renderNotes(notes);\r\n}\r\n\r\ndocument.addEventListener('note-added', async (event) => {\r\n    const newNote = event.detail;\r\n    await (0,_data_api_js__WEBPACK_IMPORTED_MODULE_0__.addNote)(newNote);\r\n    fetchNotes();\r\n});\r\n\r\ndocument.addEventListener('notes-updated', fetchNotes);\r\n\r\ndocument.addEventListener('note-deleted', async (event) => {\r\n    const noteId = event.detail;\r\n    await (0,_data_api_js__WEBPACK_IMPORTED_MODULE_0__.deleteNote)(noteId);\r\n    fetchNotes();\r\n});\r\n\r\nfetchNotes();\n\n//# sourceURL=webpack://notes-app/./src/script.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/script.js");
/******/ 	
/******/ })()
;