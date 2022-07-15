# challenge-dot-backend
Ini adalah repository magang challenge dari dot


## Alasan memilih pattern MCR(Model-Controller-Router)
Saya memilih menggunakan patter MCR(Model-Controller-Router) Karena Setiap resource di RESTful API yang dibuat, mempunyai router-nya masing-masing. 
Hal ini akan memudahkan dalam melakukan pemilihan router, dan pemasangan middleware yang mungkin dibutuhkan di dalam RESTful API. 
Nantinya, setiap resource akan lebih terkontrol router-nya, dan tidak perlu lagi menuliskan namespace lagi di dalam setiap endpoint.
Selain itu, pattern ini juga Membuat proses development code lebih mudah dimengerti dan mengurangi waktu agar development tidak terlalu lama saat di-handle oleh programmer lain.
