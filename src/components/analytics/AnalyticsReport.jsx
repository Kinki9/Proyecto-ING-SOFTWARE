import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import logo from '../assets/logo.svg';

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 10
  },
  logo: {
    width: 100,
    height: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827'
  },
  subtitle: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 30
  },
  section: {
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 10,
    backgroundColor: '#f3f4f6',
    padding: 5
  },
  table: {
    display: 'flex',
    width: '100%',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 15
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb'
  },
  tableHeader: {
    backgroundColor: '#f3f4f6',
    fontWeight: 'bold'
  },
  tableCell: {
    padding: 8,
    fontSize: 10,
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: '#e5e7eb'
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 30,
    right: 30,
    fontSize: 10,
    textAlign: 'center',
    color: '#9ca3af',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 10
  }
});

const AnalyticsReport = ({ timeRange }) => {
  // Datos de ejemplo - en una aplicación real estos vendrían de props
  const timeRangeText = {
    lastWeek: "Última semana",
    lastMonth: "Último mes",
    lastQuarter: "Último trimestre",
    lastYear: "Último año"
  }[timeRange];

  const summaryData = [
    { metric: "Satélites activos", value: "24", change: "+2" },
    { metric: "Material reciclado", value: "78%", change: "+5%" },
    { metric: "Reducción CO₂", value: "35%", change: "+7%" },
    { metric: "Residuos peligrosos", value: "15%", change: "-3%" }
  ];

  const satelliteData = [
    { id: "SAT-042", status: "Activo", energy: "1245 W", temp: "24°C" },
    { id: "SAT-043", status: "Mantenimiento", energy: "850 W", temp: "18°C" },
    { id: "SAT-044", status: "Activo", energy: "1100 W", temp: "22°C" }
  ];

  const materialData = [
    { material: "Aluminio", used: "4500 kg", recycled: "3800 kg", rate: "84%" },
    { material: "Titanio", used: "3200 kg", recycled: "2800 kg", rate: "87%" },
    { material: "Compuestos", used: "2800 kg", recycled: "2200 kg", rate: "78%" }
  ];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image src={logo} style={styles.logo} />
          <View>
            <Text style={styles.title}>Reporte Aeroespacial</Text>
            <Text style={styles.subtitle}>
              Período: {timeRangeText} | Generado el: {new Date().toLocaleDateString()}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumen Ejecutivo</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={styles.tableCell}>Métrica</Text>
              <Text style={styles.tableCell}>Valor</Text>
              <Text style={styles.tableCell}>Cambio</Text>
            </View>
            {summaryData.map((row, i) => (
              <View key={i} style={styles.tableRow}>
                <Text style={styles.tableCell}>{row.metric}</Text>
                <Text style={styles.tableCell}>{row.value}</Text>
                <Text style={styles.tableCell}>{row.change}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Monitoreo de Satélites</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={styles.tableCell}>ID Satélite</Text>
              <Text style={styles.tableCell}>Estado</Text>
              <Text style={styles.tableCell}>Energía</Text>
              <Text style={styles.tableCell}>Temperatura</Text>
            </View>
            {satelliteData.map((row, i) => (
              <View key={i} style={styles.tableRow}>
                <Text style={styles.tableCell}>{row.id}</Text>
                <Text style={styles.tableCell}>{row.status}</Text>
                <Text style={styles.tableCell}>{row.energy}</Text>
                <Text style={styles.tableCell}>{row.temp}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Uso de Materiales</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={styles.tableCell}>Material</Text>
              <Text style={styles.tableCell}>Utilizado</Text>
              <Text style={styles.tableCell}>Reciclado</Text>
              <Text style={styles.tableCell}>Tasa Reciclaje</Text>
            </View>
            {materialData.map((row, i) => (
              <View key={i} style={styles.tableRow}>
                <Text style={styles.tableCell}>{row.material}</Text>
                <Text style={styles.tableCell}>{row.used}</Text>
                <Text style={styles.tableCell}>{row.recycled}</Text>
                <Text style={styles.tableCell}>{row.rate}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.footer}>
          <Text>Reporte generado automáticamente por el Sistema de Monitoreo Aeroespacial</Text>
          <Text>Confidencial - Uso interno solamente</Text>
        </View>
      </Page>
    </Document>
  );
};

export default AnalyticsReport;