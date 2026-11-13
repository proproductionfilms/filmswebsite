import os
import sys
import time
import urllib.request

VIDEOS = [
    ("aims.mp4", "15wYwLdfGjyM99MjIdOhpB8QqKrpS5TKW"),
    ("icts.mp4", "1zGKGYpd7U5xbS-TyPsNtlxSG35bwHeAq"),
    ("schneider.mp4", "1qUR-DNEkjhObSY_kcSWSF733y1DkhKdw"),
    ("kewaunee.mp4", "1OK-xFWIE6bImILskAqdgI5TiKj8WRd0j"),
    ("iisc-spell.mp4", "1g1pzGLR4I6GHuyIg7c6wd5Y-jAP3TwTK"),
    ("iisc-msc.mp4", "1zeOIkrNbubq6VB_-a8cRxXiJ0ak2NY8I"),
    ("bhuler.mp4", "1fac-wui6LNJf835-gB_av_C-DaowWokM"),
]

out_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "public", "videos"))
os.makedirs(out_dir, exist_ok=True)

def download_file(filename, file_id):
    dest_path = os.path.join(out_dir, filename)
    part_path = dest_path + ".part"
    
    if os.path.exists(dest_path) and os.path.getsize(dest_path) > 1000000:
        print(f"[{filename}] Already downloaded ({os.path.getsize(dest_path)} bytes). Skipping.")
        return True

    url = f"https://drive.usercontent.google.com/download?id={file_id}&export=download&confirm=t"
    existing_bytes = os.path.getsize(part_path) if os.path.exists(part_path) else 0

    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"
    }
    if existing_bytes > 0:
        headers["Range"] = f"bytes={existing_bytes}-"
        print(f"[{filename}] Resuming from {existing_bytes} bytes...")
    else:
        print(f"[{filename}] Starting download from Google Drive...")

    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            total_size = resp.headers.get("Content-Length")
            mode = "ab" if existing_bytes > 0 else "wb"
            with open(part_path, mode) as f:
                downloaded = existing_bytes
                while True:
                    chunk = resp.read(262144) # 256KB chunks
                    if not chunk:
                        break
                    f.write(chunk)
                    downloaded += len(chunk)
            
            os.replace(part_path, dest_path)
            print(f"[{filename}] Complete! Saved {downloaded} bytes to {dest_path}")
            return True
    except Exception as e:
        print(f"[{filename}] Error: {e}")
        return False

def main():
    print(f"Starting video downloader into {out_dir}")
    for filename, file_id in VIDEOS:
        success = False
        for attempt in range(3):
            if download_file(filename, file_id):
                success = True
                break
            time.sleep(2)
        if not success:
            print(f"Failed to download {filename} after 3 attempts.")

if __name__ == "__main__":
    main()
