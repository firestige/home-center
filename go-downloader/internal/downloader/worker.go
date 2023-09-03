package downloader

import (
	"bufio"
	"fmt"
	"os"
)

type Worker struct {
}

type Result struct {
}

func (w *Worker) Start() (Result, error) {
	return Result{}, nil
}

func WriteFile(filePath string, content []byte) error {
	file, err := os.OpenFile(filePath, os.O_WRONLY|os.O_CREATE, 0666)
	if err != nil {
		fmt.Println("file: '" + filePath + "' open filed")
	}
	defer func(file *os.File) {
		err := file.Close()
		if err != nil {

		}
	}(file)
	write := bufio.NewWriter(file)
	if _, err := write.Write(content); err != nil {
		fmt.Println("file: '" + filePath + "' write failed")
	}
	return nil
}
