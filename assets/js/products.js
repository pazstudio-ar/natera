// ===== CONFIGURACIÓN DE LA TIENDA (editá acá) =====
const CONFIG = {
  brand: 'Natera',
  whatsapp: '5491138257825',
  instagram: 'https://www.instagram.com/naterayaromas',
  tiktok: 'https://www.tiktok.com/@naterayaromas',
  prices: { mix: 5000, hierba: 4000 },
  packaging: 'Pote mediano de 350 ml con tapa a bisagra',
  weightNote: 'El peso varía según el yuyo'
};

// Los 'benefits' están escritos en neutro (aroma, sabor, momento de uso): sin promesas de salud. Pendiente de aprobación de ella.
// cat: 'mix' | 'hierba'. La foto va en img/products/<slug>.webp (si no existe, se muestra una ilustración).
const PRODUCTS = [
  { slug:'mix-anti-estres', name:'Mix anti estrés', cat:'mix', benefits:['Para un momento de calma','Ideal para la tarde o la noche'] },
  { slug:'mix-matero', name:'Mix matero', cat:'mix', benefits:['Sabor equilibrado','Acompaña el mate de todos los días'] },
  { slug:'mix-amanecer', name:'Mix amanecer', cat:'mix', benefits:['Para arrancar la mañana','Notas cítricas'] },
  { slug:'mix-digestivo', name:'Mix digestivo', cat:'mix', benefits:['Suave y liviano','Para tomar después de las comidas'] },
  { slug:'mix-relax', name:'Mix relax', cat:'mix', benefits:['Para un momento de relax','Aromas herbales'] },
  { slug:'mix-acidez', name:'Mix acidez', cat:'mix', benefits:['Sabor suave','Mezcla de la casa'] },
  { slug:'mix-natera', name:'Mix natera', cat:'mix', featured:true, benefits:['Blend insignia de la casa','Perfil balanceado'] },
  { slug:'mix-tropical', name:'Mix tropical', cat:'mix', benefits:['Notas frutales','Refrescante'] },

  { slug:'boldo', name:'Boldo', cat:'hierba', benefits:['Hierba de tradición herbal','Para infusión o mate'] },
  { slug:'menta', name:'Menta', cat:'hierba', benefits:['Refrescante','Aroma intenso'] },
  { slug:'manzanilla', name:'Manzanilla', cat:'hierba', benefits:['Aroma suave y floral','Para tomar a la noche'] },
  { slug:'hibiscus', name:'Hibiscus', cat:'hierba', benefits:['Color rojo intenso','Sabor ácido'] },
  { slug:'burrito', name:'Burrito', cat:'hierba', benefits:['Aroma tradicional del litoral','Refrescante'] },
  { slug:'coco', name:'Coco en escamas', cat:'hierba', benefits:['Toque tropical','Aporta dulzor natural'] },
  { slug:'te-verde', name:'Té verde', cat:'hierba', benefits:['Perfil herbal','Clásico en infusión'] },
  { slug:'cedron', name:'Cedrón', cat:'hierba', benefits:['Aromático y cítrico','Muy perfumado'] },
  { slug:'te-rojo', name:'Té rojo', cat:'hierba', benefits:['Cuerpo y calidez','Color rubí'] }
];
