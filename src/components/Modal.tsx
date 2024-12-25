
const Modal = ({ onAccept, onReject }: { onAccept: () => void, onReject: () => void }) => {
  return (
    <>
    <div className="modal" tabIndex={-1} style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Storage Permission</h5>
          </div>
          <div className="modal-body">
            <p>We store some information locally to improve your experience. Do you allow us to store data in your browser?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onReject}>Decline</button>
            <button type="button" className="btn btn-primary" onClick={onAccept}>Accept</button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Modal;
