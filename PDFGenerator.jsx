// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';
import logoImage from '../../assets/Logo.png';


// Función para formatear valores monetarios
const formatCurrency = (value) => {
  const numericValue = Number(value) || 0;
  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(numericValue);
};

// Función para formatear fechas
const formatDate = (dateString) => {
  if (!dateString) return 'No especificada';
  try {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  } catch {
    return dateString;
  }
};


const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 10,
    lineHeight: 1.4,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 15,
  },
  logo: {
    width: 100,
    height: 70,
    marginRight: 20,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 9,
    color: '#666',
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2c3e50',
  },
  twoColumns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  column: {
    width: '48%',
  },
  table: {
    width: '100%',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#dddddd',
    borderStyle: 'solid',
    fontSize: 8,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
    borderBottomStyle: 'solid',
    alignItems: 'center',
    minHeight: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#003366',
    color: 'white',
    fontWeight: 'bold',
    paddingVertical: 4,
  },
  tableCol: {
    width: '35%',
    paddingHorizontal: 5,
  },
  tableColCenter: {
    width: '15%',
    paddingHorizontal: 5,
    textAlign: 'center',
  },
  tableColRight: {
    width: '25%',
    paddingHorizontal: 5,
    textAlign: 'right',
  },
  totalsContainer: {
    marginTop: 10,
  },
  totalsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 4,
  },
  totalLabel: {
    width: '60%',
    textAlign: 'right',
    paddingRight: 10,
    fontWeight: 'bold',
    fontSize: 9,
  },
  totalValue: {
    width: '25%',
    textAlign: 'right',
    paddingRight: 5,
    fontSize: 9,
  },
  grandTotal: {
    fontSize: 10,
    fontWeight: 'bold',
    borderTopWidth: 1,
    borderTopColor: '#003366',
    borderTopStyle: 'solid',
    paddingTop: 3,
    marginTop: 3,
  },
  footer: {
    position: 'absolute',
    bottom: 15,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 7,
    color: '#666666',
    borderTopWidth: 1,
    borderTopColor: '#eeeeee',
    borderTopStyle: 'solid',
    paddingTop: 5,
  },
  statusContainer: {
    marginTop: 10,
    padding: 8,
    backgroundColor: '#f8f8f8',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderStyle: 'solid',
  },
  statusPaid: {
    color: '#2e7d32',
    fontWeight: 'bold',
    fontSize: 10,
  },
  statusPending: {
    color: '#d84315',
    fontWeight: 'bold',
    fontSize: 10,
  },
  infoText: {
    marginBottom: 3,
  },
  warningText: {
    color: '#d84315',
    fontSize: 8,
    marginTop: 2,
  },
  infoBox: {
    width: '48%',
    padding: 8,
    backgroundColor: '#f8f9fa',
    borderRadius: 4,

  },
});

const ReservationPDF = ({ reservation }) => {


  if (!reservation) {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <Text>No hay datos de reserva disponibles</Text>
        </Page>
      </Document>
    );
  }

  
  // Cálculo de totales
  const totalHabitaciones = reservation.habitaciones?.reduce((sum, item) => sum + (Number(item.total) || 0), 0) || 0;
  const totalComplementos = reservation.complementos?.reduce((sum, item) => sum + (Number(item.total) || 0), 0) || 0;
  const subtotal = (reservation.totales?.subtotal) || (totalHabitaciones + totalComplementos);
  const iva = (reservation.totales?.iva) || (subtotal * 0.13);
  const total = (reservation.totales?.total) || (subtotal + iva);

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* Encabezado */}
        <View style={styles.header}>
        <Image style={styles.logo} src={logoImage} />
          <View>
            <Text style={styles.title}>Resumen de Reserva #{reservation.reserva?.id_reserva || 'N/A'}</Text>
            <Text style={styles.subtitle}>Fecha: {formatDate(new Date().toISOString())}</Text>
          </View>
        </View>

        {/* Información del Crucero */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detalles del Crucero</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.infoText}>
              <Text style={{fontWeight: 'bold'}}>Crucero: </Text>
              {reservation.reserva?.nombre_crucero || 'No especificado'}
            </Text>
            <Text style={styles.infoText}>
              <Text style={{fontWeight: 'bold'}}>Pasajeros: </Text>
              {reservation.reserva?.cantidad_pasajeros || 0}
            </Text>
            <Text style={styles.infoText}>
              <Text style={{fontWeight: 'bold'}}>Duración: </Text>
              {reservation.reserva?.duracion_dias || 0} días
            </Text>
            <Text style={styles.infoText}>
              <Text style={{fontWeight: 'bold'}}>Pago: </Text>
              {reservation.reserva?.metodo_pago || 'No especificado'}
            </Text>
          </View>
        </View>

        {/* Itinerario compacto */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Itinerario</Text>
          <View style={styles.twoColumns}>
            <View style={styles.infoBox}>
              <Text style={{fontWeight: 'bold', marginBottom: 2}}>Salida:</Text>
              <Text style={styles.infoText}>{reservation.puertos?.salida || 'No especificado'}</Text>
              <Text style={styles.infoText}>{formatDate(reservation.reserva?.fecha_inicio)}</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={{fontWeight: 'bold', marginBottom: 2}}>Regreso:</Text>
              <Text style={styles.infoText}>{reservation.puertos?.regreso || 'No especificado'}</Text>
              <Text style={styles.infoText}>{formatDate(reservation.fecha_fin)}</Text>
            </View>
          </View>
        </View>

        {/* Habitaciones - Tabla compacta */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Habitaciones ({reservation.habitaciones?.length || 0})</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableCol, {width: '40%'}]}>Tipo</Text>
              <Text style={styles.tableColCenter}>Cant.</Text>
              <Text style={styles.tableColCenter}>Pers.</Text>
              <Text style={styles.tableColRight}>P. Unit.</Text>
              <Text style={styles.tableColRight}>Total</Text>
            </View>
            
            {reservation.habitaciones.map((habitacion, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={[styles.tableCol, {width: '40%'}]}>{habitacion.nombre || 'N/A'}</Text>
                <Text style={styles.tableColCenter}>{habitacion.cantidad || 0}</Text>
                <Text style={styles.tableColCenter}>{habitacion.cantidad_huespedes || 0}</Text>
                <Text style={styles.tableColRight}>$ {formatCurrency(habitacion.precio)}</Text>
                <Text style={styles.tableColRight}>$ {formatCurrency(habitacion.total)}</Text>
              </View>
            ))}

          <View style={styles.tableRow}>
          <Text style={[styles.tableCol, {width: '80%', fontWeight: 'bold'}]}>Total Habitaciones</Text>
              
              <Text style={[styles.tableColRight, {fontWeight: 'bold'} ]}>$ {formatCurrency(totalHabitaciones)}</Text>
          </View>
          </View>
        </View>

        {/* Complementos - Solo si existen */}
        {reservation.complementos.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Servicios Adicionales ({reservation.complementos.length})</Text>
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={styles.tableCol}>Servicio</Text>
                <Text style={styles.tableColCenter}>Cant.</Text>
                <Text style={styles.tableColRight}>P. Unit.</Text>
                <Text style={styles.tableColRight}>Total</Text>
              </View>
              
              {reservation.complementos.map((complemento, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.tableCol}>{complemento.nombre || 'N/A'}</Text>
                  <Text style={styles.tableColCenter}>{complemento.cantidad || 0}</Text>
                  <Text style={styles.tableColRight}>$ {formatCurrency(complemento.precio)}</Text>
                  <Text style={styles.tableColRight}>$ {formatCurrency(complemento.total)}</Text>
                </View>
              ))}
              
          <View style={styles.tableRow}>
          <Text style={[styles.tableCol, {width: '80%', fontWeight: 'bold'}]}>Total Complementos</Text>
              
              <Text style={[styles.tableColRight, {fontWeight: 'bold'} ]}>$ {formatCurrency(totalComplementos)}</Text>
          </View>
            </View>
            
          </View>
        )}

        {/* Totales compactos */}
        <View style={[styles.section, styles.totalsContainer]}>
          <Text style={styles.sectionTitle}>Resumen de Pagos</Text>
          <View>
            <View style={styles.totalsRow}>
              <Text style={styles.totalLabel}>Subtotal:</Text>
              <Text style={styles.totalValue}>$ {formatCurrency(subtotal)}</Text>
            </View>
            <View style={styles.totalsRow}>
              <Text style={styles.totalLabel}>Impuestos (13%):</Text>
              <Text style={styles.totalValue}>$ {formatCurrency(iva)}</Text>
            </View>
            <View style={[styles.totalsRow, styles.grandTotal]}>
              <Text style={styles.totalLabel}>TOTAL:</Text>
              <Text style={[styles.totalValue, {fontWeight: 'bold'}]}>$ {formatCurrency(total)}</Text>
            </View>
          </View>
        </View>

        {/* Estado del Pago compacto */}
        <View style={styles.statusContainer}>
          <Text style={{fontWeight: 'bold', marginBottom: 4, fontSize: 9}}>ESTADO:</Text>
          
          {reservation.reserva?.estado_pago === 'Completado' ? (
            <Text style={styles.statusPaid}>PAGO COMPLETO</Text>
          ) : (
            <>
              <Text style={styles.statusPending}>PENDIENTE DE PAGO</Text>
              {reservation.reserva?.fecha_limite_pago && (
                <Text style={styles.infoText}>
                  <Text style={{fontWeight: 'bold'}}>Vence: </Text>
                  {formatDate(reservation.reserva.fecha_limite_pago)}
                </Text>
              )}
              <Text style={styles.warningText}>
                * Realice el pago antes de la fecha límite
              </Text>
            </>
          )}
        </View>

        {/* Pie de página */}
        <View style={styles.footer}>
          <Text>BALTICO DORADO | Tel: +506 2222-2222 | Email: info@balticodorado.com</Text>
        </View>

        
      </Page>
    </Document>
  );
};

ReservationPDF.propTypes = {
  reservation: PropTypes.shape({
    reserva: PropTypes.shape({
      id_reserva: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      fecha_reserva: PropTypes.string,
      estado_pago: PropTypes.oneOf(['Completado', 'Pendiente']),
      nombre_crucero: PropTypes.string,
      duracion_dias: PropTypes.number,
      fecha_inicio: PropTypes.string,
      fecha_limite_pago: PropTypes.string,
      cantidad_pasajeros: PropTypes.number,
      metodo_pago: PropTypes.string,
    }),
    fecha_fin: PropTypes.string,
    puertos: PropTypes.shape({
      salida: PropTypes.string,
      regreso: PropTypes.string,
    }),
    habitaciones: PropTypes.arrayOf(
      PropTypes.shape({
        nombre: PropTypes.string,
        cantidad: PropTypes.number,
        cantidad_pasajeros: PropTypes.number,
        precio: PropTypes.number,
        total: PropTypes.number,
      })
    ),
    complementos: PropTypes.arrayOf(
      PropTypes.shape({
        nombre: PropTypes.string,
        cantidad: PropTypes.number,
        precio: PropTypes.number,
        total: PropTypes.number,
      })
    ),
    totales: PropTypes.shape({
      subtotal: PropTypes.number,
      iva: PropTypes.number,
      total: PropTypes.number,
    }),
  }),
};

ReservationPDF.defaultProps = {
  reservation: null,
};

export default ReservationPDF;