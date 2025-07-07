import { useState, useEffect } from 'react';
import type { Empresa } from '../types';
import apiService from '../services/api';

interface UseSubdominioReturn {
  subdominio: string | null;
  empresa: Empresa | null;
  esSubdominioPrincipal: boolean;
  cargando: boolean;
  error: string | null;
}

export const useSubdominio = (): UseSubdominioReturn => {
  const [subdominio, setSubdominio] = useState<string | null>(null);
  const [empresa, setEmpresa] = useState<Empresa | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const detectarSubdominio = () => {
      const hostname = window.location.hostname;
      
      // Lista de dominios principales (desarrollo y producción)
      const dominiosPrincipales = [
        'localhost',
        '127.0.0.1',
        'minegocio.com', // dominio de producción
        'app.minegocio.com' // app principal
      ];

      // Verificar si es un dominio principal
      const esDominioPrincipal = dominiosPrincipales.some(dominio => 
        hostname === dominio || hostname.endsWith(`.${dominio}`)
      );

      if (esDominioPrincipal) {
        // Es el dominio principal (para registro de empresas)
        setSubdominio(null);
        setCargando(false);
        return;
      }

      // Extraer subdominio
      const partes = hostname.split('.');
      if (partes.length >= 3) {
        const subdominioExtraido = partes[0];
        setSubdominio(subdominioExtraido);
        return subdominioExtraido;
      } else if (partes.length === 2 && !dominiosPrincipales.includes(hostname)) {
        // Caso de desarrollo con formato subdominio.localhost
        const subdominioExtraido = partes[0];
        setSubdominio(subdominioExtraido);
        return subdominioExtraido;
      }

      setSubdominio(null);
      setCargando(false);
      return null;
    };

    const subdominioDetectado = detectarSubdominio();

    if (subdominioDetectado) {
      // Obtener información de la empresa por subdominio
      obtenerEmpresaPorSubdominio(subdominioDetectado);
    }
  }, []);

  const obtenerEmpresaPorSubdominio = async (subdominioParam: string) => {
    try {
      setCargando(true);
      setError(null);
      
      const response = await apiService.obtenerEmpresaPorSubdominio(subdominioParam);
      setEmpresa(response.data || null);
    } catch (err) {
      console.error('Error al obtener empresa por subdominio:', err);
      setError('No se pudo cargar la información de la empresa');
      setEmpresa(null);
    } finally {
      setCargando(false);
    }
  };

  return {
    subdominio,
    empresa,
    esSubdominioPrincipal: subdominio === null,
    cargando,
    error
  };
};
