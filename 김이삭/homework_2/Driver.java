package ssafy;

import org.apache.hadoop.util.ProgramDriver;

public class Driver {
	public static void main(String[] args) {
		int exitCode = -1;
		ProgramDriver pgd = new ProgramDriver();
		try {

			pgd.addClass("wordcount", Wordcount.class, "A map/reduce program that couts the words");
			pgd.addClass("wordcount1char", Wordcount1char.class, "A map/reduce program that counts the 1st character");
			pgd.addClass("wordcountsort", Wordcountsort.class, "A map/reduce program that output frequency");
			pgd.addClass("inverted", InvertedIndex.class, "A map/reduce program that generates the inverted index");
			pgd.addClass("matadd", MatrixAdd.class, "A map/reduce program that compute the addition of two matrices.");

      		pgd.driver(args);
			exitCode = 0;
		}
		catch(Throwable e) {
			e.printStackTrace();
		}

		System.exit(exitCode);
	}
}
