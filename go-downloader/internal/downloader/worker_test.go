package downloader

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"testing"
	"time"
)

func TestDownload(f *testing.T) {
	resp, err := http.Get("http://www.baidu.com")
	if err != nil {
		fmt.Println("error", err)
	}
	defer func(Body io.ReadCloser) {
		err := Body.Close()
		if err != nil {
			fmt.Println("close error", err)
		}
	}(resp.Body)
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		fmt.Println("read failed", err)
	}
	err = WriteFile("./index.html", body)
	if err != nil {
		fmt.Println("=======failed=======")
		return
	}
	fmt.Println("=======finished=======")
}

func TestWritePieces(t *testing.T) {
	sourcePath := "index.html"
	destinationPath := "index.bak"
	source, err := os.Open(sourcePath)
	if err != nil {
		fmt.Println("file: '" + sourcePath + "' open failed")
	}

	info, _ := os.Stat(sourcePath)
	size := info.Size()

	dest, err := os.OpenFile(destinationPath, os.O_WRONLY|os.O_CREATE, 0666)
	if err != nil {
		fmt.Println("file: '" + destinationPath + "' open failed")
	}

	piecesLen := 10
	pieceSize := size / int64(piecesLen)
	if pieceSize*10 < size {
		piecesLen += 1
	}

	for i := 0; i < piecesLen; i++ {
		go func(vs int) {
			ps := pieceSize
			if i == 10 {
				ps = size - 10*pieceSize
			}
			b := make([]byte, ps)
			source.ReadAt(b, int64(vs)*ps)
			dest.WriteAt(b, int64(vs)*ps)
		}(i)
	}

	time.Sleep(time.Second * 5)

	defer dest.Close()
	defer source.Close()
}
