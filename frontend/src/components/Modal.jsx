function Modal({ data }) {
  return (
    <div
      className="modal fade"
      id="modalSaya1"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{data ? data.name : "Memuat..."}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {data ? (
              <>
                {data.images?.[0] && (
                  <img
                    src={data.images[0].src}
                    alt={data.name}
                    className="img-fluid mb-3 rounded"
                  />
                )}
                <p>
                  <strong>Nama Produk:</strong> {data.name}
                </p>
                <p>
                  <strong>Harga:</strong> Rp{" "}
                  {parseInt(data.price).toLocaleString("id-ID")}
                </p>
                <p>
                  <strong>Deskripsi:</strong>
                </p>
                <div dangerouslySetInnerHTML={{ __html: data.description }} />
              </>
            ) : (
              <p>Silakan pilih produk...</p>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
