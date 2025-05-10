import React from 'react'
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

const FileTable = ({ datasetFiles }) => {
  return (
    <div className="file-table-wrapper">
      <table className="file-table">
        <thead>
          <tr>
            <th>File name</th>
            <th>Missing rate</th>
            <th>Rows</th>
            <th>Columns</th>
            <th>Duplications</th>
          </tr>
        </thead>
        <tbody>
          {datasetFiles.map((file, index) => (
            <tr key={index}>
              <td>{file.file}</td>
              <td>{file.missing}</td>
              <td>{file.rows}</td>
              <td>{file.cols}</td>
              <td>{file.duplicates}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default FileTable
