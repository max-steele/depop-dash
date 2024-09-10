import React, { useCallback, useState } from 'react';
import {useDropzone} from 'react-dropzone'
import { Box, IconButton } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { FileWithPreview, RowItem } from './utils';
import { useUploadContext } from '../UploadContext.tsx';
import ImagePreview from './ImagePreview.tsx';

interface DropzoneProps {
  row: RowItem;
  rowIndex: number;
};

const Dropzone: React.FC<DropzoneProps> = ({ row, rowIndex }) => {
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  
  const {
    saveRows
  } = useUploadContext();

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length) {
        const updatedImages = [...row.files];
        const sortedFiles = [...acceptedFiles].reverse();

        sortedFiles.forEach((file) => {
          const indexToReplace = updatedImages.indexOf(null);
          if (indexToReplace !== -1) {
            updatedImages[indexToReplace] = Object.assign(file, {
              preview: URL.createObjectURL(file),
            });
          }
        });

        saveRows((prevRows) => {
          const newRows = [...prevRows];
          newRows[rowIndex] = { ...row, files: updatedImages };
          return newRows;
        });
      }
    },
    [row, rowIndex, saveRows]
  );
  const {getRootProps, getInputProps} = useDropzone({onDrop});

  const removeFile = (file: FileWithPreview | null) => {
    const updatedImages = row.files.map((curFile) =>
      curFile?.name === file?.name ? null : curFile
    );

    saveRows((prevRows) => {
      const newRows = [...prevRows];
      newRows[rowIndex] = { ...row, files: updatedImages };
      return newRows;
    });
  };

  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
    handleOpen();
  };

  const handleSetIndex = (newIndex: number) => {
    setCurrentIndex(newIndex);
  };

  const handleOpen = () => setPreviewOpen(true);
  const handleClose = () => {
    setPreviewOpen(false);
    setCurrentIndex(null);
  };

  return (
    <Box 
      sx={{ 
        display: 'flex',
        justifyContent: 'space-between', 
        gap: 1,
      }}
    >
      <ImagePreview
        open={previewOpen}
        handleClose={handleClose} 
        images={row.files} 
        currentIndex={currentIndex || 0}
        setCurrentIndex={handleSetIndex} 
      />

      {row.files.map((file, fileIndex) => (
        <>
          {file ? (
            <Box
              key={fileIndex}
              sx={{
                width: 80,
                height: 80,
                border: '1px dashed grey',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                overflow: 'visible',
              }}
              onClick={() => handleImageClick(fileIndex)}
            >
              <img
                src={file.preview}
                alt={`Upload preview ${fileIndex + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  marginRight: -40
                }}
              />
              <IconButton
                onClick={() => removeFile(file)}
                sx={{
                  top: -43,
                  right: -22,
                  color: 'primary.main',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  },
                  transition: 'transform 0.2s',
                }}
              >
                <RemoveCircleIcon />
              </IconButton>
            </Box>
          ) : (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <Box
                key={fileIndex}
                sx={{
                  width: 80,
                  height: 80,
                  border: '1px dashed grey',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                  overflow: 'visible',
                }}
              >
                <AddAPhotoIcon />
              </Box>
            </div>
          )}
        </>
      ))}
    </Box>
  );
};

export default Dropzone;
