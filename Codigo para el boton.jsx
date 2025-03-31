<PDFDownloadLink
            document={<ReservationPDF reservation={reserva} />}
            fileName={`Reserva-Crucero-${reserva.reserva?.id_reserva || 'N/A'}.pdf`}
          >
            {({ loading }) => (
              <Button
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {loading ? 'Generando PDF...' : 'Descargar Factura'}
              </Button>
            )}
          </PDFDownloadLink>
