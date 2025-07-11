import React, { useState, useRef, useCallback, useMemo } from 'react';
import { Palette, Type, RotateCcw, Copy, Trash2, Plus, AlignLeft, AlignCenter, AlignRight, Bold, Italic } from 'lucide-react';

const CustomTemplateEditor = ({ formData, onSave, onClose }) => {
  const canvasRef = useRef(null);
  const [selectedElement, setSelectedElement] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [isResizing, setIsResizing] = useState(false);
  
  const [elements, setElements] = useState([
    {
      id: 'name',
      type: 'text',
      content: formData.name || 'Your Name',
      x: 30,
      y: 30,
      width: 200,
      height: 40,
      fontSize: 24,
      color: '#000000',
      fontFamily: 'Inter',
      fontWeight: 'bold',
      textAlign: 'left',
      rotation: 0
    },
    {
      id: 'title',
      type: 'text',
      content: formData.title || 'Your Title',
      x: 30,
      y: 80,
      width: 200,
      height: 25,
      fontSize: 16,
      color: '#666666',
      fontFamily: 'Inter',
      fontWeight: 'normal',
      textAlign: 'left',
      rotation: 0
    },
    {
      id: 'company',
      type: 'text',
      content: formData.company || 'Company Name',
      x: 30,
      y: 110,
      width: 200,
      height: 20,
      fontSize: 14,
      color: '#000000',
      fontFamily: 'Inter',
      fontWeight: 'normal',
      textAlign: 'left',
      rotation: 0
    },
    {
      id: 'email',
      type: 'text',
      content: formData.email || 'email@example.com',
      x: 30,
      y: 140,
      width: 200,
      height: 18,
      fontSize: 12,
      color: '#333333',
      fontFamily: 'Inter',
      fontWeight: 'normal',
      textAlign: 'left',
      rotation: 0
    },
    {
      id: 'phone',
      type: 'text',
      content: formData.phone || '+1 (555) 123-4567',
      x: 30,
      y: 165,
      width: 200,
      height: 18,
      fontSize: 12,
      color: '#333333',
      fontFamily: 'Inter',
      fontWeight: 'normal',
      textAlign: 'left',
      rotation: 0
    },
    {
      id: 'qr',
      type: 'qr',
      content: 'QR Code',
      x: 300,
      y: 80,
      width: 80,
      height: 80,
      fontSize: 12,
      color: '#000000',
      fontFamily: 'Inter',
      fontWeight: 'normal',
      textAlign: 'center',
      rotation: 0
    }
  ]);

  // Memoized constants for better performance
  const CANVAS_WIDTH = 384;
  const CANVAS_HEIGHT = 224;
  const SNAP_THRESHOLD = 10;

  const colorPalette = useMemo(() => [
    '#000000', '#333333', '#666666', '#999999', '#cccccc', '#ffffff',
    '#ff0000', '#ff6600', '#ffcc00', '#00ff00', '#0066ff', '#6600ff',
    '#ff0066', '#00ffff', '#ff00ff', '#660000', '#006600', '#000066'
  ], []);

  const fontFamilies = useMemo(() => [
    'Inter', 'Arial', 'Helvetica', 'Times New Roman', 'Georgia', 'Courier New'
  ], []);

  // Helper function to snap to grid
  const snapToGrid = useCallback((value, gridSize = 5) => {
    return Math.round(value / gridSize) * gridSize;
  }, []);

  // Helper function to constrain position within canvas
  const constrainPosition = useCallback((x, y, width, height) => {
    return {
      x: Math.max(0, Math.min(CANVAS_WIDTH - width, x)),
      y: Math.max(0, Math.min(CANVAS_HEIGHT - height, y))
    };
  }, []);

  const handleMouseDown = useCallback((e, elementId) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedElement(elementId);
    setIsDragging(true);
    
    const element = elements.find(el => el.id === elementId);
    if (element) {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        setDragOffset({
          x: e.clientX - rect.left - element.x,
          y: e.clientY - rect.top - element.y
        });
      }
    }
  }, [elements]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging || !selectedElement) return;
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const rawX = e.clientX - rect.left - dragOffset.x;
      const rawY = e.clientY - rect.top - dragOffset.y;
      
      const element = elements.find(el => el.id === selectedElement);
      if (element) {
        const snappedX = snapToGrid(rawX);
        const snappedY = snapToGrid(rawY);
        const { x, y } = constrainPosition(snappedX, snappedY, element.width, element.height);
        
        setElements(prev => prev.map(el => 
          el.id === selectedElement ? { ...el, x, y } : el
        ));
      }
    }
  }, [isDragging, selectedElement, dragOffset, elements, snapToGrid, constrainPosition]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsResizing(false);
  }, []);

  const updateElement = useCallback((id, updates) => {
    setElements(prev => prev.map(el => el.id === id ? { ...el, ...updates } : el));
  }, []);

  const duplicateElement = useCallback((id) => {
    const element = elements.find(el => el.id === id);
    if (element) {
      const newId = `${id}_copy_${Date.now()}`;
      const newElement = {
        ...element,
        id: newId,
        x: element.x + 20,
        y: element.y + 20
      };
      setElements(prev => [...prev, newElement]);
      setSelectedElement(newId);
    }
  }, [elements]);

  const deleteElement = useCallback((id) => {
    setElements(prev => prev.filter(el => el.id !== id));
    setSelectedElement(null);
  }, []);

  const addTextElement = useCallback(() => {
    const newId = `text_${Date.now()}`;
    const newElement = {
      id: newId,
      type: 'text',
      content: 'New Text',
      x: 50,
      y: 50,
      width: 150,
      height: 30,
      fontSize: 16,
      color: '#000000',
      fontFamily: 'Inter',
      fontWeight: 'normal',
      textAlign: 'left',
      rotation: 0
    };
    setElements(prev => [...prev, newElement]);
    setSelectedElement(newId);
  }, []);

  const selectedElementData = useMemo(() => 
    elements.find(el => el.id === selectedElement), 
    [elements, selectedElement]
  );

  const handleCanvasClick = useCallback((e) => {
    if (e.target === canvasRef.current) {
      setSelectedElement(null);
    }
  }, []);

  const handleSave = useCallback(() => {
    onSave(elements, backgroundColor);
  }, [elements, backgroundColor, onSave]);

  // Keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'd':
            e.preventDefault();
            if (selectedElement) duplicateElement(selectedElement);
            break;
          case 's':
            e.preventDefault();
            handleSave();
            break;
        }
      }
      if (e.key === 'Delete' && selectedElement) {
        deleteElement(selectedElement);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedElement, duplicateElement, deleteElement, handleSave]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-7xl w-full h-[95vh] flex">
        {/* Canvas Area */}
        <div className="flex-1 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Custom Template Editor</h2>
            <div className="flex gap-2">
              <button 
                onClick={addTextElement}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Text
              </button>
              <button 
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Save Template
              </button>
              <button 
                onClick={onClose}
                className="border border-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
          
          <div className="flex-1 flex items-center justify-center">
            <div 
              ref={canvasRef}
              className="relative border-2 border-gray-300 rounded-lg shadow-lg overflow-hidden"
              style={{ 
                width: `${CANVAS_WIDTH}px`, 
                height: `${CANVAS_HEIGHT}px`, 
                backgroundColor: backgroundColor,
                cursor: isDragging ? 'grabbing' : 'default',
                backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)',
                backgroundSize: '10px 10px'
              }}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onClick={handleCanvasClick}
            >
              {elements.map((element) => (
                <div
                  key={element.id}
                  className={`absolute cursor-move select-none transition-all duration-150 ${
                    selectedElement === element.id 
                      ? 'ring-2 ring-blue-500 ring-offset-1' 
                      : 'hover:ring-1 hover:ring-gray-300'
                  }`}
                  style={{
                    left: element.x,
                    top: element.y,
                    width: element.width,
                    height: element.height,
                    fontSize: element.fontSize,
                    color: element.color,
                    fontFamily: element.fontFamily,
                    fontWeight: element.fontWeight,
                    textAlign: element.textAlign,
                    transform: `rotate(${element.rotation}deg)`,
                    lineHeight: '1.2'
                  }}
                  onMouseDown={(e) => handleMouseDown(e, element.id)}
                >
                  {element.type === 'text' ? (
                    <div className="w-full h-full flex items-center px-1">
                      {element.content}
                    </div>
                  ) : (
                    <div className="w-full h-full bg-gray-200 border border-gray-400 flex items-center justify-center text-xs rounded">
                      QR
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Properties Panel */}
        <div className="w-80 border-l bg-gray-50 p-4 overflow-y-auto">
          <div className="space-y-6">
            {/* Quick Actions */}
            {selectedElementData && (
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Actions</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => duplicateElement(selectedElementData.id)}
                    className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                  >
                    <Copy className="w-3 h-3" />
                    Duplicate
                  </button>
                  <button
                    onClick={() => deleteElement(selectedElementData.id)}
                    className="flex items-center gap-1 px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                    Delete
                  </button>
                </div>
              </div>
            )}

            {/* Background Color */}
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <Palette className="w-4 h-4" />
                Background
              </div>
              <div className="grid grid-cols-6 gap-2 mb-3">
                {colorPalette.map((color) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded border-2 transition-all ${
                      backgroundColor === color ? 'border-blue-500 scale-110' : 'border-gray-300 hover:border-gray-400'
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setBackgroundColor(color)}
                  />
                ))}
              </div>
              <input
                type="color"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="w-full h-10 rounded border cursor-pointer"
              />
            </div>

            {/* Text Properties */}
            {selectedElementData && selectedElementData.type === 'text' && (
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <Type className="w-4 h-4" />
                  Text Properties
                </div>

                {/* Content */}
                <div className="mb-3">
                  <label className="block text-xs text-gray-600 mb-1">Content</label>
                  <input
                    type="text"
                    value={selectedElementData.content}
                    onChange={(e) => updateElement(selectedElementData.id, { content: e.target.value })}
                    className="w-full p-2 border rounded text-sm"
                  />
                </div>

                {/* Font Family */}
                <div className="mb-3">
                  <label className="block text-xs text-gray-600 mb-1">Font Family</label>
                  <select
                    value={selectedElementData.fontFamily}
                    onChange={(e) => updateElement(selectedElementData.id, { fontFamily: e.target.value })}
                    className="w-full p-2 border rounded text-sm"
                  >
                    {fontFamilies.map((family) => (
                      <option key={family} value={family}>
                        {family}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Font Size */}
                <div className="mb-3">
                  <label className="block text-xs text-gray-600 mb-1">Font Size</label>
                  <input
                    type="range"
                    min="8"
                    max="48"
                    value={selectedElementData.fontSize}
                    onChange={(e) => updateElement(selectedElementData.id, { fontSize: parseInt(e.target.value) })}
                    className="w-full"
                  />
                  <div className="text-xs text-gray-500 mt-1">{selectedElementData.fontSize}px</div>
                </div>

                {/* Color */}
                <div className="mb-3">
                  <label className="block text-xs text-gray-600 mb-1">Text Color</label>
                  <div className="grid grid-cols-6 gap-2 mb-2">
                    {colorPalette.map((color) => (
                      <button
                        key={color}
                        className={`w-6 h-6 rounded border ${
                          selectedElementData.color === color ? 'border-blue-500 border-2' : 'border-gray-300'
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => updateElement(selectedElementData.id, { color })}
                      />
                    ))}
                  </div>
                  <input
                    type="color"
                    value={selectedElementData.color}
                    onChange={(e) => updateElement(selectedElementData.id, { color: e.target.value })}
                    className="w-full h-8 rounded border cursor-pointer"
                  />
                </div>

                {/* Text Alignment */}
                <div className="mb-3">
                  <label className="block text-xs text-gray-600 mb-1">Text Alignment</label>
                  <div className="flex gap-1">
                    {[
                      { value: 'left', icon: AlignLeft },
                      { value: 'center', icon: AlignCenter },
                      { value: 'right', icon: AlignRight }
                    ].map(({ value, icon: Icon }) => (
                      <button
                        key={value}
                        onClick={() => updateElement(selectedElementData.id, { textAlign: value })}
                        className={`p-2 rounded border ${
                          selectedElementData.textAlign === value 
                            ? 'bg-blue-100 border-blue-300' 
                            : 'bg-white border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font Weight */}
                <div className="mb-3">
                  <label className="block text-xs text-gray-600 mb-1">Font Weight</label>
                  <div className="flex gap-1">
                    {[
                      { value: 'normal', label: 'Normal' },
                      { value: 'bold', label: 'Bold' }
                    ].map(({ value, label }) => (
                      <button
                        key={value}
                        onClick={() => updateElement(selectedElementData.id, { fontWeight: value })}
                        className={`px-3 py-1 rounded text-sm border ${
                          selectedElementData.fontWeight === value 
                            ? 'bg-blue-100 border-blue-300' 
                            : 'bg-white border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rotate */}
                <div className="mb-3">
                  <button
                    onClick={() => updateElement(selectedElementData.id, {
                      rotation: (selectedElementData.rotation + 90) % 360
                    })}
                    className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Rotate 90° ({selectedElementData.rotation}°)
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomTemplateEditor;
