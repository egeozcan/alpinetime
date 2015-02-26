package helpers

import(
    "net/http"
)

func WriteHeader(w http.ResponseWriter, code int, contentType string) {
    w.Header().Set("Content-Type", contentType+"; charset=utf-8")
    w.WriteHeader(code)
}