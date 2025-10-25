#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Fix encoding issues in AeroVista files
"""

import os
import re
import codecs

def fix_encoding_in_file(file_path):
    """Fix encoding issues in a single file"""
    try:
        # Read the file with different encodings
        encodings = ['utf-8', 'utf-8-sig', 'latin-1', 'cp1252']
        content = None
        
        for encoding in encodings:
            try:
                with open(file_path, 'r', encoding=encoding) as f:
                    content = f.read()
                print(f"Successfully read {file_path} with {encoding} encoding")
                break
            except UnicodeDecodeError:
                continue
        
        if content is None:
            print(f"Could not read {file_path} with any encoding")
            return False
        
        # Fix common emoji encoding issues
        emoji_fixes = {
            'ðŸ'': '🎯',
            'ðŸŽ¯': '🚀', 
            'ðŸš€': '✈️',
            'ðŸ': '📊',
            'ðŸ': '✅',
            'ðŸ': '❌',
            'ðŸ': '⚠️',
            'ðŸ': '📝',
            'ðŸ': '📈',
            'ðŸ': '🔧',
            'ðŸ': '💡',
            'ðŸ': '🏆',
            'ðŸ': '🏢',
            'ðŸ': '📧',
            'ðŸ': '🤝',
            'ðŸ': '🎉',
            'ðŸ': '🆘',
            'ðŸ': '📚',
            'ðŸ': '🛠️',
            'ðŸ': '🔍',
            'ðŸ': '📋',
            'ðŸ': '📅',
            'ðŸ': '💰',
            'ðŸ': '🎁',
            'ðŸ': '⭐',
            'ðŸ': '🔥',
            'ðŸ': '💼',
            'ðŸ': '🌍',
            'ðŸ': '🔒',
            'ðŸ': '🎓',
            'ðŸ': '📊',
            'ðŸ': '📈',
            'ðŸ': '🔧',
            'ðŸ': '💡',
            'ðŸ': '🏆',
            'ðŸ': '🏢',
            'ðŸ': '📧',
            'ðŸ': '🤝',
            'ðŸ': '🎉',
            'ðŸ': '🆘',
            'ðŸ': '📚',
            'ðŸ': '🛠️',
            'ðŸ': '🔍',
            'ðŸ': '📋',
            'ðŸ': '📅',
            'ðŸ': '💰',
            'ðŸ': '🎁',
            'ðŸ': '⭐',
            'ðŸ': '🔥',
            'ðŸ': '💼',
            'ðŸ': '🌍',
            'ðŸ': '🔒',
            'ðŸ': '🎓'
        }
        
        # Apply fixes
        for broken, fixed in emoji_fixes.items():
            content = content.replace(broken, fixed)
        
        # Write back with UTF-8 encoding
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"Fixed encoding issues in {file_path}")
        return True
        
    except Exception as e:
        print(f"Error fixing {file_path}: {e}")
        return False

def fix_all_files():
    """Fix encoding issues in all relevant files"""
    base_dir = r"C:\Documents\AeroVista-Products"
    
    # File extensions to check
    extensions = ['.md', '.html', '.txt', '.bat']
    
    files_fixed = 0
    
    for root, dirs, files in os.walk(base_dir):
        for file in files:
            if any(file.endswith(ext) for ext in extensions):
                file_path = os.path.join(root, file)
                if fix_encoding_in_file(file_path):
                    files_fixed += 1
    
    print(f"\nFixed encoding issues in {files_fixed} files")
    return files_fixed

if __name__ == "__main__":
    print("Fixing encoding issues in AeroVista files...")
    print("=" * 50)
    
    files_fixed = fix_all_files()
    
    print("=" * 50)
    print(f"Encoding fix complete! Fixed {files_fixed} files.")
    print("All emoji characters should now display correctly.")
