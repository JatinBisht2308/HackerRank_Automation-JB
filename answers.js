module.exports = {
    answer: [
      `
      import java.util.; import java.io.; import java.math.BigInteger;
      
      class Solution{
      
      public static void main(String []argh)
      {
           long l1 = 9223372036854775807l;
              long l2 = -9223372036854775808l;
              long i1 = 2147483647l;
              long i2 = -2147483648l;
              long s1 =32767l;
              long s2 = -32768l;
              long b1 =  127l;
              long b2 = -128l;
      
              BigInteger la =BigInteger.valueOf(l1);
               BigInteger lb =BigInteger.valueOf(l2);  
               BigInteger ia =BigInteger.valueOf(i1);
               BigInteger ib =BigInteger.valueOf(i2);
              BigInteger sa = BigInteger.valueOf(s1);
               BigInteger sb =BigInteger.valueOf(s2);
               BigInteger ba =BigInteger.valueOf(b1);
               BigInteger bb =BigInteger.valueOf(b2);
      
          Scanner sc = new Scanner(System.in);
          int t=sc.nextInt();
      
          for(int i=0;i<t;i++)
          {
              BigInteger k = sc.nextBigInteger();
      
      
      
             int a1,a2,b5,b6,c1,c2,d1,d2;
           a1 = k.compareTo(la);
           a2 = k.compareTo(lb);
           b5=  k.compareTo(ia);
           b6 = k.compareTo(ib);
           c1 = k.compareTo(sa);
           c2 = k.compareTo(sb);
           d1 = k.compareTo(ba);
           d2 = k.compareTo(bb);
      
      
      
              if(a1==1 || a2 == -1){
                  System.out.println(k + " can't be fitted anywhere.");
                  }
              else{
              System.out.println(k +" can be fitted in:");
              }
      
              if ((d1== -1||d1==0) && (d2 == 1||d2==0)){
                  System.out.println("* byte");
              }
      
              if ((c1== -1||c1==0) && (c2 == 1||c2==0)){
                  System.out.println("* short");
              }
      
              if ((b5== -1||b5==0) && (b6 == 1||b6==0)){
                  System.out.println("* int");    
              }
      
              if ((a1== -1||a1==0) && (a2 == 1||a2==0)){
                  System.out.println("* long");    
              }
      
      
         }
      
       }
      }
  `,
      `
      import java.util.Scanner;
import java.text.NumberFormat;
import java.util.Locale;

public class Solution {
    
    public static void main(String[] args) {
        /* Read input */
        Scanner scanner = new Scanner(System.in);
        double payment = scanner.nextDouble();
        scanner.close();

        /* Create custom Locale for India. 
          I used the "IANA Language Subtag Registry" to find India's country code */
        Locale indiaLocale = new Locale("en", "IN");

        /* Create NumberFormats using Locales */
        NumberFormat us     = NumberFormat.getCurrencyInstance(Locale.US);
        NumberFormat india  = NumberFormat.getCurrencyInstance(indiaLocale);
        NumberFormat china  = NumberFormat.getCurrencyInstance(Locale.CHINA);
        NumberFormat france = NumberFormat.getCurrencyInstance(Locale.FRANCE);

        /* Print output */        
        System.out.println("US: "     + us.format(payment));
        System.out.println("India: "  + india.format(payment));
        System.out.println("China: "  + china.format(payment));
        System.out.println("France: " + france.format(payment));
    }
}
      `
      ,
      `
      import java.io.*;
import java.util.*;

public class Solution {

   public static void main(String[] args) {
        
        Scanner sc=new Scanner(System.in);
        String A=sc.next();
        String B=sc.next();
        System.out.println(A.length()+B.length());
        System.out.println(A.compareTo(B)>0?"Yes":"No");
        System.out.println(capitalizeFirstLetter(A) + " " + capitalizeFirstLetter(B));
    }
    
    public static String capitalizeFirstLetter(String original) {
    if (original == null || original.length() == 0) {
        return original;
    }
    return original.substring(0, 1).toUpperCase() + original.substring(1);
}
        
    }
      `,
      `
      import java.util.Scanner;

public class Solution {

    public static void main(String[] args) {
        /* Read input */
        Scanner scan = new Scanner(System.in);
        String s  = scan.next();
        int start = scan.nextInt();
        int end   = scan.nextInt();
        scan.close();
        
        System.out.println(s.substring(start, end));
    }
}
      `
    ],
  };