
package.json

```json
  "dist": {
    "entry": "src/index.jsx",
    "filename": "dist.js",
    "filenameMin": "dist.min.js",
    "path": "dist"
  },
  "feature": {
    "entry": "src/index.jsx",
    "filename": "custom.js",
    "filenameMin": "custom.min.js",
    "library": "Feature",
    "path": "dist"
  },
  "vendor": {
    "entry": [
      "di_get_merge",
      "di_media_device",
      "di_store",
      "immutable",
      "react",
      "redux",
      "react-redux",
      "react-dom",
      "redux-thunk"
    ],
    "filename": "vendor.js",
    "filenameMin": "vendor.min.js",
    "library": "Vendor",
    "manifest": "dist/mainifest.json",
    "path": "dist"
	}
```
