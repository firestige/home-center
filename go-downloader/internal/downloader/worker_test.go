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

func TestPause(t *testing.T) {

}

func download(url string) {
	//    确认是否支持
}

func isSupportRange(url string) int {
	req, err := http.NewRequest("HEAD", "", nil)
	if err != nil {
		return -1
	}
	req.Header.Set("Range", "0-")
	resp, err := (&http.Client{}).Do(req)
	if err != nil {
		return -1
	}
	// 判断报文头是否支持范围请求，如果支持返回报文长度，不支持返回-1
	resp.Header.Get("Content-Length")
	return 0
}

func doPieces(url string, n int) error {
	b, err := request(url, 0, 0)
	if err != nil {
		return err
	}
	err = writeFile(b, "", 0)
	if err != nil {
		return err
	}
	return nil
}

func request(url string, offset int64, size int64) (body []byte, err error) {
	req, _ := http.NewRequest("GET", "", nil)
	req.Header.Set("Range", "0-")
	resp, _ := (&http.Client{}).Do(req)
}

func writeFile(content []byte, filePath string, offset int64) error {
	dest, err := os.OpenFile(filePath, os.O_WRONLY|os.O_CREATE, 0666)
	if err != nil {
		fmt.Println("")
		return err
	}
	_, err = dest.WriteAt(content, offset)
	if err != nil {
		fmt.Println("")
		return err
	}
	return nil
}
