# Các bước để khởi chạy app của nhân viên giao hàng:
Bước 1: Tải các file trong đường dẫn "etpShop-deliver" về trong 1 folder. \
Bước 2: Tải phiên bản nodejs mới nhất( tối thiểu v16.13.2). Link tải nodejs: https://nodejs.org/en/download/. \
Bước 3: Gõ "npm install" và ấn enter. \
Bước 4: Tải expo CLI. Link tải: https://docs.expo.dev/more/expo-cli/. \
Bước 5: Đăng nhập vào expo ở link trên. \
Bước 6: Tải app expo go trên điện thoại trên chplay và đăng nhập chung với tài khoản khi đăng nhập expo CLI trên máy tính. \
Bước 7: Mở command prompt ở folder chứa code, gõ: "npx expo start" và copy địa chỉ ip. \
Bước 8: Mở file "/components/socket.js" sửa đường link bằng địa chỉ ip ở bước 6. Ví dụ: "http://{địa chỉ ip}:5001", lưu file và nhấn "R" ở cửa số cmd trên. \
Bước 9: Mở app expo go trên điện thoại và quét mã QR trong cửa sổ cmd. \
Bước 10: Sau khi xong bước 9, app sẽ tự động chạy trên điện thoại. \
