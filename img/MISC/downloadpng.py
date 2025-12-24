import zipfile
import os
import imghdr

docx_path = "Misc.docx"  # 你的 Word 文件名
output_dir = "./"         # 输出到当前目录

def extract_images(docx_path, output_dir):
    # 解压 docx（zip 文件）
    with zipfile.ZipFile(docx_path, "r") as z:
        # 找到所有 media 图片
        pics = [f for f in z.namelist() if f.startswith("word/media/")]

        if not pics:
            print("❌ 文档中没有找到任何图片")
            return

        for i, pic_name in enumerate(pics, 1):
            # 读出图片二进制
            data = z.read(pic_name)

            # 判断图片类型
            ext = imghdr.what(None, data)
            if ext is None:
                ext = "bin"  # 无法识别类型时

            # 拼接文件名
            out_name = f"{i}.{ext}"
            out_path = os.path.join(output_dir, out_name)

            # 写出图片
            with open(out_path, "wb") as f:
                f.write(data)

            print(f"✔ 已保存 {out_name}")

    print("🎉 完成！所有图片已导出。")


if __name__ == "__main__":
    extract_images(docx_path, output_dir)
