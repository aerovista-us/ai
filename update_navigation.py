#!/usr/bin/env python3
# Update all pages with new hamburger navigation

import os
import re

def update_navigation():
    base_path = r"c:\Documents\AeroVista-Products"
    
    # Read the new navigation component
    with open(os.path.join(base_path, 'navigation.html'), 'r', encoding='utf-8') as f:
        new_navigation = f.read()
    
    # Get all HTML files
    html_files = [f for f in os.listdir(base_path) if f.endswith('.html') and f != 'navigation.html']
    
    print(f"Found {len(html_files)} HTML files to update")
    
    for html_file in html_files:
        file_path = os.path.join(base_path, html_file)
        print(f"Updating {html_file}...")
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            
            # Remove old navigation patterns
            # Pattern 1: Standard nav with nav-links
            old_nav_pattern = r'<nav[^>]*class="navigation"[^>]*>.*?</nav>'
            content = re.sub(old_nav_pattern, '', content, flags=re.DOTALL)
            
            # Pattern 2: Any remaining nav elements
            old_nav_pattern2 = r'<nav[^>]*>.*?</nav>'
            content = re.sub(old_nav_pattern2, '', content, flags=re.DOTALL)
            
            # Pattern 3: Remove duplicate navigation divs
            duplicate_nav_pattern = r'<div class="navigation">.*?</div>'
            content = re.sub(duplicate_nav_pattern, '', content, flags=re.DOTALL)
            
            # Add skip link if not present
            if 'Skip to main content' not in content:
                skip_link = '<a href="#main-content" class="sr-only" style="position: absolute; top: -40px; left: 6px; background: #000; color: #fff; padding: 8px; text-decoration: none; z-index: 1000;" onfocus="this.style.top=`6px`" onblur="this.style.top=`-40px`">Skip to main content</a>'
                content = content.replace('<body>', f'<body>\n{skip_link}')
            
            # Insert new navigation after body tag
            if '<body>' in content:
                content = content.replace('<body>', f'<body>\n{new_navigation}')
            elif '<body' in content:
                # Handle body tag with attributes
                body_match = re.search(r'<body[^>]*>', content)
                if body_match:
                    body_tag = body_match.group()
                    content = content.replace(body_tag, f'{body_tag}\n{new_navigation}')
            
            # Add main-content id if not present
            if 'id="main-content"' not in content:
                # Find the first main content div or section
                main_content_patterns = [
                    r'(<div[^>]*class="[^"]*container[^"]*"[^>]*>)',
                    r'(<div[^>]*class="[^"]*header[^"]*"[^>]*>)',
                    r'(<main[^>]*>)',
                    r'(<div[^>]*class="[^"]*hero[^"]*"[^>]*>)'
                ]
                
                for pattern in main_content_patterns:
                    match = re.search(pattern, content)
                    if match:
                        old_tag = match.group(1)
                        new_tag = old_tag.replace('>', ' id="main-content">')
                        content = content.replace(old_tag, new_tag)
                        break
            
            # Save if changes were made
            if content != original_content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"  ✅ Updated navigation in {html_file}")
            else:
                print(f"  No navigation changes needed in {html_file}")
                
        except Exception as e:
            print(f"  ❌ Error updating {html_file}: {e}")
    
    print("\nNavigation update complete!")
    print("All pages now have the new hamburger-style navigation with file tree structure.")

if __name__ == "__main__":
    update_navigation()

